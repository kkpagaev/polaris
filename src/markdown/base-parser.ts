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

  public repeat(times: number, callback: (time: number) => any) {
    for (let i = 0; i < times; i++) {
      callback(i)
    }
  }
}
