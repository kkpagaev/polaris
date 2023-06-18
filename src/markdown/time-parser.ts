import { BaseParser } from "./base-parser"
import { TimeInfo, Range } from "./event-models"

export class TimeInfoParser extends BaseParser<TimeInfo> {
  public parse(): TimeInfo {
    return this.choice<TimeInfo>(
      () => this.parseTimeSpan(),
      () => this.parseTime(),
    )
  }

  public parseTime(): string {
    const hours = this.repeat(2, () => this.digit()).join("")
    this.matchString(":")
    const minutes = this.repeat(2, () => this.digit()).join("")

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
