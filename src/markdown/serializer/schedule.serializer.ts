import { ScheduleEvent } from "../event-models"
import { Serializer } from "./serializer.interface"

export class ScheduleSerializer implements Serializer<ScheduleEvent[]> {
  public serialize(events: ScheduleEvent[]): string {
    return events.map((event) => event.toString()).join("\n\n")
  }
}
