import { TimeInfo } from "../event-models"
import { Serializer } from "./serializer.interface"

export class TimeInfoSerializer implements Serializer<TimeInfo> {
  public serialize(timeInfo: TimeInfo): string {
    if (typeof timeInfo === "string") {
      return timeInfo
    }

    return `${timeInfo.start} - ${timeInfo.end}`
  }
}
