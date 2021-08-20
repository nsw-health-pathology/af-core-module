import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { AbstractHttpDataService } from '../abstract';
import { IApiResponse, IHeaders, IQueryParams } from '../models';

/**
 * HTTP Service class for calling external API services
 */
export class AxiosHttpDataService extends AbstractHttpDataService {

  constructor(
    protected readonly axiosClient: AxiosInstance,
  ) {
    super();
  }

  /** Make a HTTP call with GET HTTP method */
  async makeHttpGetCall<K>(
    url: string,
    headers: IHeaders = {},
    queryParams: IQueryParams = {},
    timeout = 0,
    retries = 0,
  ): Promise<IApiResponse<K>> {

    const getCall = (innerUrl: string, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<K>> => {
      return this.axiosClient.get<K>(
        innerUrl,
        requestConfig,
      );
    };

    return this.axiosHttpCall(url, queryParams, headers, timeout, retries, getCall);
  }

  /** Make a HTTP call with PUT HTTP method */
  async makeHttpPutCall<T, K = T>(
    url: string,
    payload: T,
    headers: IHeaders = {},
    timeout = 0,
    retries = 0,
  ): Promise<IApiResponse<K>> {

    const putCall = (innerUrl: string, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<K>> => {
      return this.axiosClient.put<T, AxiosResponse<K>>(
        innerUrl,
        payload,
        requestConfig,
      );
    };

    return this.axiosHttpCall(url, {}, headers, timeout, retries, putCall);
  }

  /** Make a HTTP call with POST HTTP method */
  async makeHttpPostCall<T, K = T>(
    url: string,
    payload: T,
    headers: IHeaders = {},
    queryParams: IQueryParams = {},
    timeout = 0,
    retries = 0,
  ): Promise<IApiResponse<K>> {

    const postCall = (innerUrl: string, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<K>> => {
      return this.axiosClient.post<T, AxiosResponse<K>>(
        innerUrl,
        payload,
        requestConfig,
      );
    };

    return this.axiosHttpCall(url, queryParams, headers, timeout, retries, postCall);
  }

  /**
   * Make the http call to the external API service
   *
   * @param url The URL of the endpoint to call
   * @param queryParams Any query Params to send
   * @param headers any HTTP Headers to send
   * @param timeout The number of milliseconds that an API request should wait before timing out.
   * @param retries The number of times to retry the operation, if a timeout is received.
   * @param axiosRequestCallFn The axios operation function
   */
  private async axiosHttpCall<K>(
    url: string,
    queryParams: IQueryParams,
    headers: IHeaders,
    timeout: number,
    retries: number,
    axiosRequestCallFn: (fnUrl: string, fnRequestConfig: AxiosRequestConfig) => Promise<AxiosResponse<K>>,
  ): Promise<IApiResponse<K>> {

    const requestConfig: AxiosRequestConfig = {
      headers,
      params: queryParams,
      timeout,
    };

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {

        const response = await axiosRequestCallFn(url, requestConfig);

        const apiResponse: IApiResponse<K> = {
          body: response.data,
          status: response.status,
          headers: response.headers as IHeaders,
        };

        return apiResponse;

      } catch (error) {

        const e: AxiosError = error as AxiosError;

        const timeoutRegExp = /^timeout of [0-9]+ms exceeded$/;

        if (attempt < retries && timeoutRegExp.test(e.message)) {
          continue;
        }

        const errorData = {
          name: e.name,
          message: e.message,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: e.response?.data || `API Call Failed. ${e.message}`,
        };

        const apiResponse: IApiResponse<unknown> = {
          body: e.response?.data || {},
          error: errorData,
          status: e.response?.status || StatusCodes.INTERNAL_SERVER_ERROR,
          headers: e.response?.headers as IHeaders,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return apiResponse as IApiResponse<any>;
      }
    }
    return {} as IApiResponse<any>;
  }

}
