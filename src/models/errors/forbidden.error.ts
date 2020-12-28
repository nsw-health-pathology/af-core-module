import { StatusCodes } from 'http-status-codes';

import { IApiError } from './api-error';

/**
 * Represents a 403 Forbidden RESTful API error.
 * The server understood the request, but is refusing to fulfill it.
 * If authentication credentials were provided in the request, the server
 * considers them insufficient to grant access. The client SHOULD NOT
 * automatically repeat the request with the same credentials
 */
export class ForbiddenError extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.FORBIDDEN; }
  public get type(): string { return 'https://httpstatuses.com/403'; }
  public get title(): string { return 'FORBIDDEN'; }

}
