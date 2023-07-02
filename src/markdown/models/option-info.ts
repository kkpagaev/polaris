import { OptionInfoSerializer } from "../serializer/option-info.serializer"

export class OptionInfo<Value = any> {
  constructor(public name: string, public value: Value) {}

  public toString() {
    return new OptionInfoSerializer().serialize(this)
  }
}
