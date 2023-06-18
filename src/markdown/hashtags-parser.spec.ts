import { HashTagsParser } from "./hashtags-parser"

describe("HashTagsParser", () => {
  it("should parse a single hashtag", () => {
    const input = `
  
    #foo
    `

    expect(new HashTagsParser(input).parse()).toEqual(["foo"])
  })

  it("should parse a multiple hashtags", () => {
    const input = `
  
    #foo
    #bar #2  #baz`

    expect(new HashTagsParser(input).parse()).toEqual([
      "foo",
      "bar",
      "2",
      "baz",
    ])
  })
})
