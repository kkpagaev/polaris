export class BaseParser {
  public input: string
  public pos: number

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
    const nextChar = this.peek()

    if (!this.isWhiteSpace(nextChar)) {
      throw new Error(
        `Unexpected character: "${nextChar}". Expecting whitespace.`,
      )
    }

    this.next()

    while (this.isWhiteSpace(this.peek())) {
      this.next()
    }
  }

  public matchString(target: string): void {
    for (let i = 0; i < target.length; i++) {
      const nextChar = this.peek()

      if (nextChar === "") {
        throw new Error(`Unexpected end of input`)
      }

      if (nextChar !== target[i]) {
        throw new Error(
          `Unexpected character: ${nextChar}. Expecting '${target[i]}' at position ${this.pos}`,
        )
      }

      this.next()
    }
  }

  public isWhiteSpace(char: string): boolean {
    return char === " "
  }

  public repeat<T>(times: number, callback: (time: number) => T): T[] {
    const result: T[] = []

    for (let i = 0; i < times; i++) {
      result.push(callback(i))
    }

    return result
  }

  /**
   * Parse a char satisfying a condition
   */
  public sat(
    predicate: (char: string) => boolean,
    errorMessage: string,
  ): string {
    if (!predicate(this.peek())) {
      throw new Error(errorMessage)
    }

    return this.next()
  }

  public optional<T>(callback: () => T): T | null {
    const startPos = this.pos

    try {
      return callback()
    } catch (e) {
      // no error only if no consumed input
      if (this.pos === startPos) {
        return null
      }

      throw e
    }
  }

  public attempt<T>(callback: () => T): T | null {
    const startPos = this.pos

    try {
      return callback()
    } catch (e) {
      this.pos = startPos

      return null
    }
  }
}
