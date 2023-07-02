import { ScheduleEvent } from "../models/schedule-event"
import { TimeInfo } from "../models/time-info"
import { Serializer } from "./serializer.interface"
import { TimeInfoSerializer } from "./time-info.serializer"

export class EventSerializer implements Serializer<ScheduleEvent> {
  public serialize(event: ScheduleEvent): string {
    const hashtagLines = event.hashTags.map((tag) => `#${tag}`)

    const descriptionLines = event.description.map((line) => `  ${line}`)

    const lines = [
      ...hashtagLines,
      this.serializeTitleLine(event),
      ...descriptionLines,
    ]

    return lines.join("\n")
  }

  private serializeTitleLine(event: ScheduleEvent) {
    const parts = ["-", this.serializeTime(event.time), event.title]

    const optionsSerialized = event.options.map((option) => option.toString())

    if (optionsSerialized.length) {
      parts.push("|", ...optionsSerialized)
    }

    return parts.join(" ")
  }

  private serializeTime(timeInfo: TimeInfo): string {
    return new TimeInfoSerializer().serialize(timeInfo)
  }
}
