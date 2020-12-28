import { StatusCodes } from 'http-status-codes';

import { IApiError } from './api-error';

/**
 * Represents a 404 Not Found RESTful API error.
 * The server has not found anything matching the Request-URI.
 * No indication is given of whether the condition is temporary or permanent.
 *
 * It is recommended that developers extend this class to include a more meaningful response title and message
 */
export class NotFoundError extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.NOT_FOUND; }
  public get type(): string { return 'https://httpstatuses.com/404'; }
  public get title(): string { return 'NOT FOUND'; }

  constructor(message = 'The requested resource was not found') {
    super(message);
  }

}
