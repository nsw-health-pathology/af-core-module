import { StatusCodes } from 'http-status-codes';

import { IApiError } from './api-error';

/**
 * Represents a 401 Unauthorized RESTful API error.
 * The request requires user authentication.
 *
 * The user has not provided the correct credentials to be considered authenticated
 * to perform the request.
 * Not to be confused with an RBAC based permissions error which would
 * be reflected using a 403 Forbidden error response code
 */
export class UnauthorizedError extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.UNAUTHORIZED; }
  public get type(): string { return 'https://httpstatuses.com/401'; }
  public get title(): string { return 'UNAUTHORIZED'; }

}
