import { BaseParser } from "./base-parser"
import { ScheduleEvent, Range } from "./event-models"

export class EventParser extends BaseParser {
  public parseEvent(): ScheduleEvent {
    this.matchString("-")
    this.spaces1()
    const time = this.parseTimePointOrTimeSpan()
    const title = this.parseTitle()
    // this.matchString("|")

    return new ScheduleEvent(time, title)
  }

  public parseWord(): string {
    const result: string[] = []
    const nextChar = this.next()

    if (!this.isLetter(nextChar)) {
      throw new Error(`Expecting at least one letter`)
    }
    result.push(nextChar)

    while (this.isLetter(this.peek())) {
      result.push(this.next())
    }

    return result.join("")
  }

  public parseTitle(): string {
    const title: string[] = []

    while (!["", "|", "\n"].includes(this.peek())) {
      title.push(this.next())
    }

    return title.join("").trim()
  }

  public parseTime(): string {
    const hourDigits: string[] = []

    this.repeat(2, () => {
      if (!this.isDigit(this.peek())) {
        throw new Error("Expecting a digit")
      }

      hourDigits.push(this.next())
    })

    this.matchString(":")

    const minuteDigits: string[] = []

    this.repeat(2, () => {
      if (!this.isDigit(this.peek())) {
        throw new Error("Expecting a digit")
      }

      minuteDigits.push(this.next())
    })

    return hourDigits.join("") + ":" + minuteDigits.join("")
  }

  public parseTimePointOrTimeSpan(): Range<string> | string {
    const start = this.parseTime()
    this.spaces()

    if (this.peek() === "-") {
      this.next()
      this.spaces()

      const end = this.parseTime()
      this.spaces()

      return new Range(start, end)
    }

    return start
  }
}
