import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { AbstractHttpDataService } from '../abstract';
import { IApiResponse, IHeaders, IQueryParams } from '../models';

/**
 * HTTP Service class for calling external API services
 */
export class AxiosHttpDataService extends AbstractHttpDataService {

  constructor(
    protected readonly axiosClient: AxiosInstance
  ) {
    super();
  }

  defaultTimeout = 0;
  defaultRetries = 0;

  /** Make a HTTP call with GET HTTP method */
  async makeHttpGetCall<K>(
    url: string,
    headers: IHeaders = {},
    queryParams: IQueryParams = {},
    timeout = this.defaultTimeout,
    retries = this.defaultRetries
  ): Promise<IApiResponse<K>> {

    const getCall = (innerUrl: string, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<K>> => {
      return this.axiosClient.get<K>(
        innerUrl,
        requestConfig
      );
    };

    return this.axiosHttpCall(url, queryParams, headers, timeout, retries, getCall);
  }

  /** Make a HTTP call with PUT HTTP method */
  async makeHttpPutCall<T, K = T>(
    url: string,
    payload: T,
    headers: IHeaders = {},
    timeout = this.defaultTimeout,
    retries = this.defaultRetries
  ): Promise<IApiResponse<K>> {

    const putCall = (innerUrl: string, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<K>> => {
      return this.axiosClient.put<T, AxiosResponse<K>>(
        innerUrl,
        payload,
        requestConfig
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
    timeout = this.defaultTimeout,
    retries = this.defaultRetries
  ): Promise<IApiResponse<K>> {

    const postCall = (innerUrl: string, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<K>> => {
      return this.axiosClient.post<T, AxiosResponse<K>>(
        innerUrl,
        payload,
        requestConfig
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
   * @param retries The number of times to retry the operation, if a specified response code (or a timeout) is received.
   * @param retryStatusCodes A list of the response status codes that should trigger a retry.
   * @param axiosRequestCallFn The axios operation function
   */
  private async axiosHttpCall<K>(
    url: string,
    queryParams: IQueryParams,
    headers: IHeaders,
    timeout: number,
    retries: number,
    retryStatusCodes: string[],
    axiosRequestCallFn: (fnUrl: string, fnRequestConfig: AxiosRequestConfig) => Promise<AxiosResponse<K>>
  ): Promise<IApiResponse<K>> {

    // Force at least one execution of the for loop
    if (retries < 0) {
      retries = 0;
    }

    // Axios's requestConfig timeout parameter is based on the Server Response time.
    // If a successful connection can be made to the remote server, the response has
    // <timeout> milliseconds to return to the Axios client - otherwise it will trigger
    // a 'timeout of 1ms exceeded' error

    const requestConfig: AxiosRequestConfig = {
      headers,
      params: queryParams,
      timeout
    };

    let lastKnownApiResponse: IApiResponse<unknown> | undefined;
    let lastKnownApiErrorResponse: IApiResponse<unknown> | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {

        const response = await axiosRequestCallFn(url, requestConfig);

        const apiResponse: IApiResponse<K> = {
          body: response.data,
          status: response.status,
          headers: response.headers as IHeaders
        };

        lastKnownApiResponse = apiResponse;

        // Check the response status to see if we need to retry.
        const retryStatusFound = retryStatusCodes.find(statusCode => {
          const responseStatusCode = response.status.toString();
          const codeRegex = new RegExp(statusCode);
          return statusCode === responseStatusCode || codeRegex.test(responseStatusCode);
        });

        if (retryStatusFound) {
          continue;
        }

        return apiResponse;

      } catch (error) {

        const e = error as AxiosError;

        const errorMessage = e.message;
        const responseData: unknown = e.response?.data;

        const errorData = {
          name: e.name,
          message: errorMessage,
          data: responseData || `API Call Failed. ${errorMessage}`
        };

        lastKnownApiErrorResponse = {
          body: (responseData || {}),
          error: errorData,
          status: e.response?.status || StatusCodes.INTERNAL_SERVER_ERROR,
          headers: e.response?.headers as IHeaders
        };

        // This regex was derived from testing with the Axios client
        // The first error is based on the Server Response timeout
        // The second error is based on the  HTTP TCP Connection Timeout
        const timeoutRegExp = /^timeout of [0-9]+ms exceeded$/;
        const nodeTimeoutError = /ETIMEDOUT/;

        if (timeoutRegExp.test(errorData.message) || nodeTimeoutError.test(errorData.message)) {
          continue;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return lastKnownApiErrorResponse as IApiResponse<any>;
      }
    }

    // The typescript compiler is not able to infer at least one execution of the
    // for loop so it believes that lastKnownApiErrorResponse could still be undefined.
    // Whilst we don't expect it to be, this should at least allow us to catch a last responsible
    // moment before returning to the calling application code.
    if (!lastKnownApiErrorResponse) {
      lastKnownApiErrorResponse = {
        body: {},
        status: StatusCodes.INTERNAL_SERVER_ERROR
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return lastKnownApiResponse as IApiResponse<any> || lastKnownApiErrorResponse as IApiResponse<any>;
  }
}
