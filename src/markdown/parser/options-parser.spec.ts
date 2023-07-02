import { OptionInfo } from "../models/option-info"
import { OptionsParser } from "./options-parser"

describe("EventParser", () => {
  it("should parse simple options", () => {
    expect(new OptionsParser(`| -c -foo-bar`).parse()).toEqual([
      new OptionInfo("c", true),
      new OptionInfo("foo-bar", true),
    ])
  })

  it("should parse options with different values", () => {
    expect(
      new OptionsParser(`| -m -c red -p [string, foo@bar.com, vlad]`).parse(),
    ).toEqual([
      new OptionInfo("m", true),
      new OptionInfo("c", "red"),
      new OptionInfo("p", ["string", "foo@bar.com", "vlad"]),
    ])
  })
})
