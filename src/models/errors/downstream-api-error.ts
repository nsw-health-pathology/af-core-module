import { IApiResponse } from '../api-response';
import { IApiError } from './api-error';

/**
 * Represents a generic error response from a downstream api.
 */
export class DownstreamApiError extends Error implements IApiError {

  private readonly errorStatusCode: number;

  private readonly errorResponse: unknown;

  public get statusCode(): number { return this.errorStatusCode; }
  public get type(): string { return `https://httpstatuses.com/${this.errorStatusCode}`; }
  public get title(): string { return 'DOWNSTREAM_API_ERROR'; }

  public get additionalInformation(): unknown { return this.errorResponse; }

  constructor(response: IApiResponse<unknown>) {
    const message = 'An error occurred in a downstream request. See additionalInformation for more details';
    super(message);

    this.errorStatusCode = response.status;
    this.errorResponse = response.error || response.body;
  }

}
