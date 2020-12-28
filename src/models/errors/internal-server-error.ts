import { StatusCodes } from 'http-status-codes';

import { IApiError } from './api-error';

/** Represents a generic RESTful API error */
export class InternalServerError extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.INTERNAL_SERVER_ERROR; }
  public get type(): string { return 'https://httpstatuses.com/500'; }
  public get title(): string { return 'INTERNAL SERVER ERROR'; }

  constructor(e: Error) {
    super(e.message);
  }

}
