import { IHttpResponse } from './../azure-function-response';
import { IHttpErrorResponse } from './http-error-response';

/** Determines if error object is an instance of an Api Error */
export function isInstanceOfApiError(error: Error): error is IApiError {
  const e = error as Partial<IApiError>;
  return e.statusCode !== undefined && e.type !== undefined && e.title !== undefined;
}

/** Represents a generic RESTful API error */
export interface IApiError extends Error {
  statusCode: number;
  type: string;
  title: string;

  // tslint:disable-next-line: no-any
  additionalInformation?: any;
}

export const responsePayloadFromApiError = (error: IApiError): IHttpErrorResponse => ({
  status: error.statusCode,
  type: error.type,
  title: error.title,
  detail: error.message,
  additionalInformation: error.additionalInformation
});

export const azureFunctionResponseFromApiError = (error: IApiError): IHttpResponse<IHttpErrorResponse> => ({
  body: responsePayloadFromApiError(error),
  headers: {
    'Content-Type': 'application/json'
  },
  status: error.statusCode
});
