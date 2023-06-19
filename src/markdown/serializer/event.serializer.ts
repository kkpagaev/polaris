import { ScheduleEvent, TimeInfo } from "../event-models"
import { Serializer } from "./serializer.interface"

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
    if (typeof timeInfo === "string") {
      return timeInfo
    }

    return `${timeInfo.start} - ${timeInfo.end}`
  }
}
