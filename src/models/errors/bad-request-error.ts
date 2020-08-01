import * as HttpStatus from 'http-status-codes';
import { IApiError } from './api-error';

/** Represents a generic RESTful API error */
export class BadRequestError extends Error implements IApiError {

  public get statusCode(): number { return HttpStatus.BAD_REQUEST; }
  public get type(): string { return 'https://httpstatuses.com/400'; }
  public get title(): string { return 'BAD REQUEST'; }

}
