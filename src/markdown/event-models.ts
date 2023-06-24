import { EventSerializer } from "./serializer/event.serializer"
import { OptionInfoSerializer } from "./serializer/option-info.serializer"

export class Range<T> {
  constructor(public start: T, public end: T) {}
}

export type TimeInfo = Range<string> | string

export class ScheduleEvent {
  constructor(
    public time: Range<string> | string,
    public title: string,
    public options: OptionInfo[],
    public description: string[],
    public hashTags: string[],
  ) {}

  public toString() {
    return new EventSerializer().serialize(this)
  }
}

export class OptionInfo<Value = any> {
  constructor(public name: string, public value: Value) {}

  public toString() {
    return new OptionInfoSerializer().serialize(this)
  }
}
