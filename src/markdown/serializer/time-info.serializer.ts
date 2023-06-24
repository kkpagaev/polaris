import { TimeInfo } from "../models/time-info"
import { Serializer } from "./serializer.interface"

export class TimeInfoSerializer implements Serializer<TimeInfo> {
  public serialize(timeInfo: TimeInfo): string {
    if (!timeInfo.end) {
      return timeInfo.start
    }

    return `${timeInfo.start} - ${timeInfo.end}`
  }
}
