import { EventParser } from "./event-parser"
import { ScheduleEvent } from "./models/schedule-event"
import { TimeInfo } from "./models/time-info"

describe("EventParser", () => {
  it("should parse event with time range", () => {
    expect(new EventParser(`- 18:00 - 19:00 Title `).parse()).toEqual(
      new ScheduleEvent(new TimeInfo("18:00", "19:00"), "Title", [], [], []),
    )
  })

  it("should parse event with single time point", () => {
    expect(new EventParser(`- 18:00 Title `).parse()).toEqual(
      new ScheduleEvent(new TimeInfo("18:00"), "Title", [], [], []),
    )
  })

  it("should parse a title with spaces", () => {
    expect(new EventParser(`- 18:00 Title with spaces    `).parse()).toEqual(
      new ScheduleEvent(new TimeInfo("18:00"), "Title with spaces", [], [], []),
    )
  })
})
