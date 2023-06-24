import { OptionInfo } from "../event-models"
import { Serializer } from "./serializer.interface"

export class OptionInfoSerializer implements Serializer<OptionInfo> {
  public serialize(option: OptionInfo<any>): string {
    if (option.value === false) {
      return ""
    }

    const optionParts = [`-${option.name}`, this.serializeValue(option.value)]

    return optionParts.filter((value) => value !== "").join(" ")
  }

  private serializeValue(value: any): string {
    if (Array.isArray(value)) {
      return `[${value.join(", ")}]`
    }

    if (typeof value === "string") {
      return value
    }

    if (value === true) {
      return ""
    }

    throw new Error(`This type of value is not supported yet`)
  }
}
