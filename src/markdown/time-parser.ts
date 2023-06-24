import { BaseParser } from "./base-parser"
import { TimeInfo } from "./models/time-info"

export class TimeInfoParser extends BaseParser<TimeInfo> {
  public parse(): TimeInfo {
    return this.choice<TimeInfo>(
      () => this.parseTimeSpan(),
      () => this.parseSingleTime(),
    )
  }

  public parseSingleTime(): TimeInfo {
    return new TimeInfo(this.parseTime())
  }

  public parseTimeSpan(): TimeInfo {
    const start = this.parseTime()
    this.spaces()
    this.matchString("-")
    this.spaces()
    const end = this.parseTime()

    return new TimeInfo(start, end)
  }

  private parseTime(): string {
    const hours = this.repeat(2, () => this.digit()).join("")
    this.matchString(":")
    const minutes = this.repeat(2, () => this.digit()).join("")

    return `${hours}:${minutes}`
  }
}
