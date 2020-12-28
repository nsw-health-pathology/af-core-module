import { StatusCodes } from 'http-status-codes';

import { IApiError } from './api-error';

/**
 * Represents a 415 Unsupported Media Type RESTful API error.
 * The server has not found anything matching the Request-URI.
 * The server is refusing to service the request because the entity of the
 * request is in a format not supported by the requested resource for the
 * requested method.
 */
export class UnsupportedMediaTypeError extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.UNSUPPORTED_MEDIA_TYPE; }
  public get type(): string { return 'https://httpstatuses.com/415'; }
  public get title(): string { return 'UNSUPPORTED MEDIA TYPE'; }

}
