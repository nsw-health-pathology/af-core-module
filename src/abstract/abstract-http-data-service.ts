import { IApiResponse } from '../models/api-response';
import { IHeaders } from '../models/http-headers';
import { IQueryParams } from '../models/http-query-params';

/**
 * Abstract http data service
 */
export abstract class AbstractHttpDataService {

  /** Make a HTTP call with GET HTTP method */
  public abstract makeHttpGetCall<K>(url: string, queryParams: IQueryParams, headers: IHeaders): Promise<IApiResponse<K>>;

  /** Make a HTTP call with PUT HTTP method */
  public abstract makeHttpPutCall<T, K = T>(url: string, headers: IHeaders, payload: T): Promise<IApiResponse<K>>;

  /** Make a HTTP call with POST HTTP method */
  public abstract makeHttpPostCall<T, K = T>(url: string, headers: IHeaders, payload: T, queryParams?: IQueryParams): Promise<IApiResponse<K>>;
}
