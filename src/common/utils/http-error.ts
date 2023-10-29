export type KnownHttpErrorStatus = '400' | '404' | '500';

export class HttpError extends Error {
  statusCode: KnownHttpErrorStatus;
  constructor(statusCode: KnownHttpErrorStatus) {
    super();
    this.statusCode = statusCode;
  }
}

export type HttpErrorMap = Partial<
  Record<string | 'all', string>
>;

export const defaultHttpErrorMap: Record<KnownHttpErrorStatus, string> = {
  '400': 'Something went wrong. Check the data provided.',
  '404': 'Something went wrong. Not found item.',
  '500': 'Something went wrong. Please try again late.',
};
