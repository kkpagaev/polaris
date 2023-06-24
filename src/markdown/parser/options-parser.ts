import { OptionInfo } from "../models/option-info"
import { BaseParser } from "./base-parser"
import { isDigit, isLetter } from "./utils"

export class OptionsParser extends BaseParser<OptionInfo[]> {
  public parse(): OptionInfo<any>[] {
    this.matchString("|")
    this.spaces()

    const options = this.many(() => this.parseOption())

    this.spaces()
    this.expectOneOf(["", "\n"])

    return options
  }

  public parseOption(): OptionInfo {
    this.matchString("-")
    const name = this.parseOptionName()
    this.spaces()

    const value = this.parseOptionValue()
    this.spaces()

    return new OptionInfo(name, value)
  }

  private parseOptionName(): string {
    const firstLetter = this.sat(isLetter, "Option should start with a letter")

    const otherLetters = this.many(() =>
      this.sat(
        (ch) => isLetter(ch) || isDigit(ch) || ch === "-",
        "Option name may include only letters, digits or dashes",
      ),
    )

    return [firstLetter, ...otherLetters].join("")
  }

  private parseOptionValue<Value = any>(): Value {
    return this.optional(() =>
      this.choice<any>(
        () => this.parseArray(),
        () => this.parseWord(),
      ),
    ).getOrElse(true)
  }

  private parseWord(): string {
    const otherAllowedChars = [".", "@", "_"]

    return this.many1(() =>
      this.sat(
        (ch) => isLetter(ch) || isDigit(ch) || otherAllowedChars.includes(ch),
      ),
    ).join("")
  }

  private parseArray(): string[] {
    this.matchString("[")
    this.spaces()

    const values = this.sepBy(
      () => {
        const word = this.parseWord()
        this.spaces()
        return word
      },
      () => {
        this.matchString(",")
        this.spaces()
      },
    )

    this.matchString("]")

    return values
  }
}
