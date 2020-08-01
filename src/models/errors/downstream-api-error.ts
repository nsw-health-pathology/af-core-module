import { IApiResponse } from '../api-response';
import { IApiError } from './api-error';

/**
 * Represents a generic error response from a downstream api.
 */
export class DownstreamApiError extends Error implements IApiError {

  private readonly errorStatusCode: number;

  // tslint:disable-next-line: no-any
  private readonly errorResponse: any;

  public get statusCode(): number { return this.errorStatusCode; }
  public get type(): string { return `https://httpstatuses.com/${this.errorStatusCode}`; }
  public get title(): string { return 'DOWNSTREAM_API_ERROR'; }

  // tslint:disable: no-any
  // tslint:disable: no-unsafe-any
  public get additionalInformation(): any { return this.errorResponse; }
  // tslint:enable: no-any
  // tslint:enable: no-unsafe-any

  // tslint:disable-next-line: no-any
  constructor(response: IApiResponse<any>) {
    const message = 'An error occurred in a downstream request. See additionalInformation for more details';
    super(message);

    this.errorStatusCode = response.status;
    this.errorResponse = response.error || response.body;
  }

}
