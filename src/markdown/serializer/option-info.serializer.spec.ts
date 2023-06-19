import { OptionInfo } from "../event-models"
import { OptionInfoSerializer } from "./option-info.serializer"

describe("OptionInfoSerializer", () => {
  it("should serialize an option with value true", () => {
    const result = new OptionInfoSerializer().serialize(
      new OptionInfo("m", true),
    )

    expect(result).toBe("-m")
  })

  it("should serialize an option with value false", () => {
    const result = new OptionInfoSerializer().serialize(
      new OptionInfo("m", false),
    )

    expect(result).toBe("")
  })

  it("should serialize an option with value of type string", () => {
    const result = new OptionInfoSerializer().serialize(
      new OptionInfo("c", "red"),
    )

    expect(result).toBe("-c red")
  })

  it("should serialize an option with value of type array", () => {
    const result = new OptionInfoSerializer().serialize(
      new OptionInfo("p", ["string", "foo@bar.com", "vlad"]),
    )

    expect(result).toBe("-p [string, foo@bar.com, vlad]")
  })
})
