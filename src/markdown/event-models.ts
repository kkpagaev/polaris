export class Range<T> {
  constructor(public start: T, public end: T) {}
}

export class ScheduleEvent {
  constructor(public time: Range<string> | string, public title: string) {}
}

export class OptionInfo<Value = any> {
  constructor(public name: string, public value: Value) {}
}
