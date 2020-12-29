import { StatusCodes } from 'http-status-codes';

import { IApiError } from './api-error';

/** Represents a 400 Bad Request RESTful API error */
export class BadRequestError extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.BAD_REQUEST; }
  public get type(): string { return 'https://httpstatuses.com/400'; }
  public get title(): string { return 'BAD REQUEST'; }

}
