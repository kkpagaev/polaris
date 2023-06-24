import { OptionInfo, ScheduleEvent, Range } from "../event-models"
import { EventSerializer } from "./event.serializer"

describe("EventSerializer", () => {
  it("should serialize an event", () => {
    const result = new EventSerializer().serialize(
      new ScheduleEvent(
        new Range("11:00", "15:40"),
        "Title",
        [
          new OptionInfo("m", true),
          new OptionInfo("c", "red"),
          new OptionInfo("p", ["string", "foo@bar.com", "vlad"]),
        ],
        ["description line 1", "description line 2"],
        ["Hangar18", "PeaceSells", "HolyWars", "Lucretia", "AngryAgain"],
      ),
    )

    expect(result).toBe(`#Hangar18
#PeaceSells
#HolyWars
#Lucretia
#AngryAgain
- 11:00 - 15:40 Title | -m -c red -p [string, foo@bar.com, vlad]
  description line 1
  description line 2`)
  })
})
