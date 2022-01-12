import { IApiResponse, IHeaders, IQueryParams } from '../models';

/**
 * Abstract http data service
 */
export abstract class AbstractHttpDataService {

  /** Make a HTTP call with GET HTTP method */
  public abstract makeHttpGetCall<K>(
    url: string,
    headers: IHeaders,
    queryParams: IQueryParams,
    timeout?: number,
    retries?: number,
    retryStatusCodes?: string[]): Promise<IApiResponse<K>>;

  /** Make a HTTP call with PUT HTTP method */
  public abstract makeHttpPutCall<T, K = T>(
    url: string,
    payload: T,
    headers: IHeaders,
    timeout?: number,
    retries?: number,
    retryStatusCodes?: string[]): Promise<IApiResponse<K>>;

  /** Make a HTTP call with POST HTTP method */
  public abstract makeHttpPostCall<T, K = T>(
    url: string,
    payload: T,
    headers: IHeaders,
    queryParams: IQueryParams,
    timeout?: number,
    retries?: number,
    retryStatusCodes?: string[]): Promise<IApiResponse<K>>;
}
