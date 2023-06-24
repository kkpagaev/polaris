import { TimeInfoSerializer } from "../serializer/time-info.serializer"

export class TimeInfo {
  constructor(public start: string, public end?: string) {}

  public toString() {
    return new TimeInfoSerializer().serialize(this)
  }
}
