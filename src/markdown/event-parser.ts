import { BaseParser } from "./base-parser"
import { ScheduleEvent, Range } from "./event-models"
import { OptionsParser } from "./options-parser"
import { ParsingResultUtil } from "./parsing-result"
import { isDigit } from "./utils"

export class EventParser extends BaseParser<ScheduleEvent> {
  public parse(): ScheduleEvent {
    this.matchString("-")
    this.spaces1()
    const time = this.parseTimeOrSpan()
    this.spaces1()
    const title = this.parseTitle()

    const options = this.optional(() =>
      this.applyParser(OptionsParser),
    ).getOrElse([])

    return new ScheduleEvent(time, title, options)
  }

  public parseTitle(): string {
    const title: string[] = []

    while (!["", "|", "\n"].includes(this.peek())) {
      title.push(this.next())
    }

    return title.join("").trim()
  }

  public parseTimeOrSpan(): Range<string> | string {
    const range = this.attempt(() => this.parseTimeSpan())

    if (!ParsingResultUtil.isSuccess(range)) {
      return this.parseTime()
    }

    return range.value
  }

  public parseTime(): string {
    const hours = this.repeat(2, () =>
      this.sat(isDigit, "Expecting a digit"),
    ).join("")

    this.matchString(":")

    const minutes = this.repeat(2, () =>
      this.sat(isDigit, "Expecting a digit"),
    ).join("")

    return `${hours}:${minutes}`
  }

  public parseTimeSpan(): Range<string> {
    const start = this.parseTime()
    this.spaces()
    this.matchString("-")
    this.spaces()
    const end = this.parseTime()

    return new Range(start, end)
  }
}
