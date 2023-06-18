import { BaseParser } from "./base-parser"
import { OptionInfo, ScheduleEvent } from "./event-models"
import { OptionsParser } from "./options-parser"
import { TimeInfoParser } from "./time-parser"

export class EventParser extends BaseParser<ScheduleEvent> {
  public parse(): ScheduleEvent {
    this.matchString("-")
    this.spaces1()

    const time = this.applyParser(TimeInfoParser)
    this.spaces1()

    const title = this.parseTitle()

    const options = this.parseOptions()

    return new ScheduleEvent(time, title, options)
  }

  private parseTitle(): string {
    return this.many(() => this.noneOf(["", "|", "\n"]))
      .join("")
      .trim()
  }

  private parseOptions(): OptionInfo[] {
    return this.optional(() => this.applyParser(OptionsParser)).getOrElse([])
  }
}
