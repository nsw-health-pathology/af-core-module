import { IApiResponse } from './api-response';
import { IHeaders } from './http-headers';

/** Represents the response data model for an Azure Function */
export interface IHttpResponse<T> {
  body: T;
  headers: { [key: string]: string };
  status: number;
}

export const azureFunctionHttpResponseFromApiResponse = <T>(response: IApiResponse<T>): IHttpResponse<T> => {

  // Default headers to be a JSON response. If the client has specified different headers,
  // then allow this to overwrite in the header
  let headers: IHeaders = {
    'Content-Type': 'application/json'
  };

  headers = { ...headers, ...response.headers };

  const httpResponse: IHttpResponse<T> = {
    body: response.body,
    headers,
    status: response.status
  };

  return httpResponse;
};
