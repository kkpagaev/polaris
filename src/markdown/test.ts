import { BaseParser } from "./base-parser"
import { DescriptionParser } from "./description-parser"
import { OptionsParser } from "./options-parser"

class ManyParser extends BaseParser<void> {
  constructor(input) {
    super(input)
  }

  parse() {
    return this.optional(() =>
      this.choice(
        () => this.matchString("a"),
        () => this.matchString("b"),
      ),
    )
  }
}

// const p = new ManyParser("hello hello hel")
// p.parse()
const input = `
description line 1  
description line 2`

console.log(new DescriptionParser(input).parse())
