class Range<T> {
  constructor(public start: T, public end: T) {}
}

class ScheduleEvent {
  constructor(public time: Range<string> | string, public title: string) {}
}

export class BaseParser {
  private input: string
  private pos: number

  constructor(input: string) {
    this.input = input
    this.pos = 0
  }

  public next(): string {
    if (this.isOver()) {
      throw new Error(`Unexpected end of input`)
    }

    return this.input.charAt(this.pos++)
  }

  public peek(): string {
    return this.isOver() ? "" : this.input.charAt(this.pos)
  }

  public isOver(): boolean {
    return this.pos >= this.input.length
  }

  public spaces(): void {
    while (this.isWhiteSpace(this.peek())) {
      this.next()
    }
  }

  public spaces1(): void {
    if (!this.isWhiteSpace(this.peek())) {
      throw new Error(
        `Unexpected character: "${this.peek()}". Expecting whitespace.`,
      )
    }

    this.next()

    while (this.isWhiteSpace(this.peek())) {
      this.next()
    }
  }

  public matchString(target: string): void {
    for (let i = 0; i < target.length; i++) {
      const nextChar = this.next()

      if (nextChar !== target[i]) {
        throw new Error(
          `Unexpected character: ${nextChar}. Expecting '${target[i]}' at position ${this.pos}`,
        )
      }
    }
  }

  public isWhiteSpace(char: string): boolean {
    return char === " "
  }

  public isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char)
  }

  public isDigit(char: string): boolean {
    return /[0-9]/.test(char)
  }

  public parseEvent(): ScheduleEvent {
    this.matchString("-")
    this.spaces1()
    const time = this.parseTimePointOrTimeSpan()
    this.spaces1()
    const title = this.parseWord()

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

      return new Range(start, end)
    }

    return start
  }

  private repeat(times: number, callback: (time: number) => any) {
    for (let i = 0; i < times; i++) {
      callback(i)
    }
  }
}

const input = `- 18:00 - 19:00 T1itle`

const p = new BaseParser(input)

console.log(p.parseEvent())
