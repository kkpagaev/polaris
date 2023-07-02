import { ScheduleEvent } from "../models/schedule-event"
import { BaseParser } from "./base-parser"
import { EventParser } from "./event-parser"

export class ScheduleParser extends BaseParser<ScheduleEvent[]> {
  public parse(): ScheduleEvent[] {
    const events = this.many(() => {
      const event = this.applyParser(EventParser)

      this.many(() => {
        this.emptyLine()
      })
      return event
    })

    // this.expectOneOf([""])

    return events
  }
}
