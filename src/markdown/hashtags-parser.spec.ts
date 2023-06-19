import { HashTagsParser } from "./hashtags-parser"

describe("HashTagsParser", () => {
  it("should parse a single hashtag", () => {
    const input = `
  
    #foo`

    const result = new HashTagsParser(input).parse()

    expect(result).toEqual(["foo"])
  })

  it("should parse a multiple hashtags", () => {
    const input = `
  
    #foo
    #bar #2  #baz`

    const result = new HashTagsParser(input).parse()

    expect(result).toEqual(["foo", "bar", "2", "baz"])
  })
})
