import { BaseParser } from "./base-parser"
import { OptionInfo } from "./event-models"
import { isDigit, isLetter } from "./utils"

export class OptionsParser extends BaseParser<OptionInfo[]> {
  public parse(): OptionInfo<any>[] {
    this.matchString("|")
    this.spaces()

    const options = this.many(() => this.parseOption())

    return options
  }

  public parseOption(): OptionInfo {
    this.matchString("-")
    const name = this.parseOptionName()

    this.spaces()

    return new OptionInfo(name, true)
  }

  public parseOptionName(): string {
    const firstLetter = this.sat(isLetter, "Option should start with a letter")

    const otherLetters = this.many(() =>
      this.sat(
        (ch) => isLetter(ch) || isDigit(ch) || ch === "-",
        "Option name may include only letters, digits or dashes",
      ),
    )

    return [firstLetter, ...otherLetters].join("")
  }
}
