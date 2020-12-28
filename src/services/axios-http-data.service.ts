import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { AbstractHttpDataService } from '../abstract/abstract-http-data-service';
import { IApiResponse } from '../models/api-response';
import { IHeaders } from '../models/http-headers';

/**
 * HTTP Service class for calling external API services
 */
export class AxiosHttpDataService extends AbstractHttpDataService {

  constructor(
    protected readonly axiosClient: AxiosInstance
  ) {
    super();
  }

  /** Make a HTTP call with GET HTTP method */
  async makeHttpGetCall<K>(
    url: string,
    headers: IHeaders = {},
    queryParams: unknown = {}
  ): Promise<IApiResponse<K>> {

    const getCall = (innerUrl: string, requestConfig: AxiosRequestConfig) => {
      return this.axiosClient.get<K>(
        innerUrl,
        requestConfig
      );
    };

    return this.axiosHttpCall(url, queryParams, headers, getCall);
  }

  /** Make a HTTP call with PUT HTTP method */
  async makeHttpPutCall<T, K = T>(
    url: string,
    payload: T,
    headers: IHeaders = {}
  ): Promise<IApiResponse<K>> {

    const putCall = (innerUrl: string, requestConfig: AxiosRequestConfig) => {
      return this.axiosClient.put<T, AxiosResponse<K>>(
        innerUrl,
        payload,
        requestConfig
      );
    };

    return this.axiosHttpCall(url, {}, headers, putCall);
  }

  /** Make a HTTP call with POST HTTP method */
  async makeHttpPostCall<T, K = T>(
    url: string,
    payload: T,
    headers: IHeaders = {},
    queryParams: unknown = {}
  ): Promise<IApiResponse<K>> {

    const postCall = (innerUrl: string, requestConfig: AxiosRequestConfig) => {
      return this.axiosClient.post<T, AxiosResponse<K>>(
        innerUrl,
        payload,
        requestConfig
      );
    };

    return this.axiosHttpCall(url, queryParams, headers, postCall);
  }

  /**
   * Make the http call to the external API service
   *
   * @param url The URL of the endpoint to call
   * @param queryParams Any query Params to send
   * @param headers any HTTP Headers to send
   * @param axiosRequestCallFn The axios operation function
   */
  private async axiosHttpCall<K>(
    url: string,
    queryParams: unknown, headers: IHeaders,
    axiosRequestCallFn: (fnUrl: string, fnRequestConfig: AxiosRequestConfig) => Promise<AxiosResponse<K>>
  ): Promise<IApiResponse<K>> {

    const requestConfig: AxiosRequestConfig = {
      headers,
      params: queryParams
    };

    try {

      const response = await axiosRequestCallFn(url, requestConfig);

      const apiResponse: IApiResponse<K> = {
        body: response.data,
        status: response.status,
        headers: response.headers as IHeaders
      };

      return apiResponse;

    } catch (error) {

      const e: AxiosError = error as AxiosError;

      const errorData = {
        name: e.name,
        message: e.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: e.response?.data || `API Call Failed. ${e.message}`
      };

      const apiResponse: IApiResponse<unknown> = {
        body: e.response?.data || {},
        error: errorData,
        status: e.response?.status || StatusCodes.INTERNAL_SERVER_ERROR,
        headers: e.response?.headers as IHeaders
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return apiResponse as IApiResponse<any>;
    }
  }

}
