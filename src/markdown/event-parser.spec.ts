import { Range, ScheduleEvent } from "./event-models"
import { EventParser } from "./event-parser"

describe("EventParser", () => {
  it("should parse event with time range", () => {
    expect(new EventParser(`- 18:00 - 19:00 Title `).parse()).toEqual(
      new ScheduleEvent(new Range("18:00", "19:00"), "Title", []),
    )
  })

  it("should parse event with single time point", () => {
    expect(new EventParser(`- 18:00 Title `).parse()).toEqual(
      new ScheduleEvent("18:00", "Title", []),
    )
  })

  it("should parse a title with spaces", () => {
    expect(new EventParser(`- 18:00 Title with spaces    `).parse()).toEqual(
      new ScheduleEvent("18:00", "Title with spaces", []),
    )
  })
})
