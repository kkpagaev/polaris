import { EventSerializer } from "../serializer/event.serializer"
import { OptionInfo } from "./option-info"
import { TimeInfo } from "./time-info"

export class ScheduleEvent {
  constructor(
    public time: TimeInfo,
    public title: string,
    public options: OptionInfo[],
    public description: string[],
    public hashTags: string[],
  ) {}

  public toString() {
    return new EventSerializer().serialize(this)
  }
}
