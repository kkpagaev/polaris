export class SuccessParsingResult<T> {
  public readonly tag = "Success"

  constructor(public value: T) {}

  public getOrElse(defaultValue: T): T {
    return this.value
  }
}

export class FailureParsingResult<T = any> {
  public readonly tag = "Failure"

  public getOrElse(defaultValue: T): T {
    return defaultValue
  }
}

export type ParsingResult<T> = SuccessParsingResult<T> | FailureParsingResult<T>

export const isSuccess = <T>(
  value: ParsingResult<T>,
): value is SuccessParsingResult<T> => value.tag === "Success"

export const ParsingResultUtil = {
  isSuccess,
}
