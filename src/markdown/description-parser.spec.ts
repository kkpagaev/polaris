import { DescriptionParser } from "./description-parser"

describe("DescriptionParser", () => {
  it("should parse description lines", () => {
    const input = `
    description line 1  
    description line 2
    
    `

    expect(new DescriptionParser(input).parse()).toEqual([
      "description line 1",
      "description line 2",
    ])
  })
})
