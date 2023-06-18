import { BaseParser } from "./base-parser"
import { ScheduleEvent, Range, OptionInfo } from "./event-models"
import { isDigit } from "./utils"

export class EventParser extends BaseParser {
  public parseEvent(): ScheduleEvent {
    this.matchString("-")
    this.spaces1()
    const time = this.parseTimeOrSpan()
    this.spaces1()
    const title = this.parseTitle()
    // this.matchString("|")

    return new ScheduleEvent(time, title)
  }

  public parseOptions(): OptionInfo[] {
    return []
  }

  public parseOption(): OptionInfo {
    this.matchString("-")

    return {} as OptionInfo
  }

  public parseOptionName(): OptionInfo {
    this.matchString("-")

    return {} as OptionInfo
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

    if (!range) {
      return this.parseTime()
    }

    return range
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
