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

  describe("many", () => {
    class ManyParser extends BaseParser {
      constructor(input) {
        super(input)
      }

      parse() {
        return this.many(() => {
          this.matchString("hello ")
        })
      }
    }

    it("should succeed with 2 result values", () => {
      const p = new ManyParser("hello hello ")
      const result = p.parse()
      expect(result).toEqual([undefined, undefined])
    })

    it("should succeed with 0 results", () => {
      const p = new ManyParser("")
      const result = p.parse()
      expect(result).toEqual([])
    })

    it("should succeed when the correct input is followed by a non-matching pattern", () => {
      const p = new ManyParser("hello hello f")
      const result = p.parse()
      expect(result).toEqual([undefined, undefined])
    })

    it("should fail when an an iteration consumes some input before not matching", () => {
      const p = new ManyParser("hello hello hel")
      expect(() => p.parse()).toThrow()
    })
  })

  describe("many1", () => {
    class Many1Parser extends BaseParser {
      constructor(input) {
        super(input)
      }

      parse() {
        return this.many(() => {
          this.matchString("hello ")
        })
      }
    }

    it("should succeed with one result", () => {
      const p = new Many1Parser("hello ")
      const result = p.parse()
      expect(result).toEqual([undefined])
    })

    it("should fail when 0 results matched", () => {
      const p = new Many1Parser("hello2 ")
      expect(() => p.parse()).toThrow()
    })
  })
})
