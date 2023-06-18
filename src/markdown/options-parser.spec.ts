import { OptionInfo } from "./event-models"
import { OptionsParser } from "./options-parser"

describe("EventParser", () => {
  it("should parse simple options", () => {
    expect(new OptionsParser(`| -c -foo-bar`).parse()).toEqual([
      new OptionInfo("c", true),
      new OptionInfo("foo-bar", true),
    ])
  })
})
