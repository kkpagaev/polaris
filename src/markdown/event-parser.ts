import { BaseParser } from "./base-parser"
import { ScheduleEvent, Range } from "./event-models"
import { OptionsParser } from "./options-parser"
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
    return this.many(() => this.noneOf(["", "|", "\n"]))
      .join("")
      .trim()
  }

  public parseTimeOrSpan(): Range<string> | string {
    return this.choice<Range<string> | string>(
      () => this.parseTimeSpan(),
      () => this.parseTime(),
    )
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
