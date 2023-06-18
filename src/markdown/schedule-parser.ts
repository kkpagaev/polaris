import { BaseParser } from "./base-parser"
import { ScheduleEvent } from "./event-models"
import { EventParser } from "./event-parser"

export class ScheduleParser extends BaseParser<ScheduleEvent[]> {
  public parse(): ScheduleEvent[] {
    const events = this.many(() => {
      const event = this.applyParser(EventParser)
      this.many(() => this.oneOf(["\n"]))
      return event
    })

    // this.expectOneOf([""])

    return events
  }
}
