import { BaseParser } from "./base-parser"

describe("BaseParser", () => {
  describe("optional", () => {
    class OptionalParser extends BaseParser {
      constructor(input) {
        super(input)
      }

      parse() {
        this.optional(() => {
          this.matchString("hello")
        })
      }
    }

    it("should fail when some input is consumed", () => {
      const p = new OptionalParser("hell")

      expect(() => p.parse()).toThrowError("Unexpected end of input")
    })

    it("should return to previous position if no input consumed", () => {
      const p = new OptionalParser("foo")

      p.parse()

      expect(p.pos).toBe(0)
    })
  })

  describe("attempt", () => {
    class AttemptParser extends BaseParser {
      constructor(input) {
        super(input)
      }

      parse() {
        this.attempt(() => {
          this.matchString("hello")
        })
      }
    }

    it("should not fail even when some input is consumed", () => {
      const p = new AttemptParser("hell")

      expect(() => p.parse()).not.toThrow()
      expect(p.pos).toBe(0)
    })

    it("should return to previous position if no input consumed", () => {
      const p = new AttemptParser("foo")

      p.parse()

      expect(p.pos).toBe(0)
    })
  })
})
