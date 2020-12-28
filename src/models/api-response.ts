import { IHeaders } from './http-headers';

/**
 * Represents the expected response model for an Azure Function
 */
export interface IApiResponse<T> {
  status: number;
  body: T;
  error?: unknown;
  headers?: IHeaders;
}
