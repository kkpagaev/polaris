export class SuccessParsingResult<T> {
  public readonly tag = "Success"

  constructor(public value: T) {}
}

export class FailureParsingResult {
  public readonly tag = "Failure"
}

export type ParsingResult<T> = SuccessParsingResult<T> | FailureParsingResult

export const isSuccess = <T>(
  value: ParsingResult<T>,
): value is SuccessParsingResult<T> => value.tag === "Success"

export const ParsingResultUtil = {
  isSuccess,
}
