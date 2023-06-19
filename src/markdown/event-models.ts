export class Range<T> {
  constructor(public start: T, public end: T) {}
}

export class ScheduleEvent {
  constructor(public time: Range<string> | string, public title: string) {}
}
