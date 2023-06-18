import { BaseParser } from "./base-parser"
import { isSuccess } from "./parsing-result"
import { isDigit, isLetter } from "./utils"

export class HashTagsParser extends BaseParser<string[]> {
  public parse(): string[] {
    return this.many(() => {
      const res = this.attempt(() => {
        this.many1(() => this.oneOf(["\n"]))
        this.spaces()

        return this.many1(() => {
          const tag = this.parseHashTag()
          this.spaces()
          return tag
        })
      })

      if (!isSuccess(res)) {
        throw new Error("not a hastag list")
      }

      return res.value
    }).flat()
  }

  private parseHashTag(): string {
    this.matchString("#")

    const otherAllowedChars = ["_"]

    return this.many1(() =>
      this.sat(
        (ch) => isLetter(ch) || isDigit(ch) || otherAllowedChars.includes(ch),
      ),
    ).join("")
  }
}
