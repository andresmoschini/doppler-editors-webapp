type SuccessResult<TResult> = TResult extends void
  ? { success: true }
  : { success: true; value: TResult };
type ErrorResult<TExpectedError> = TExpectedError & { success: false };

export type Result<
  TResult = void,
  TExpectedError = void
> = TExpectedError extends void
  ? SuccessResult<TResult>
  : SuccessResult<TResult> | ErrorResult<TExpectedError>;
