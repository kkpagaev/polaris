export class Range<T> {
  constructor(public start: T, public end: T) {}
}

export type TimeInfo = Range<string> | string

export class ScheduleEvent {
  constructor(
    public time: Range<string> | string,
    public title: string,
    public options: OptionInfo[],
  ) {}
}

export class OptionInfo<Value = any> {
  constructor(public name: string, public value: Value) {}
}
