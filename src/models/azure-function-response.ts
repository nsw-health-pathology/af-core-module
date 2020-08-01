import { IApiResponse } from './api-response';
/** Represents the response data model for an Azure Function */
export interface IAzureFunctionResponse<T> {
  body: T;
  headers: { [key: string]: string };
  status: number;
}

export const azureFunctionJsonResponseFromApiResponse = <T>(response: IApiResponse<T>): IAzureFunctionResponse<T> => ({
  body: response.body,
  headers: {
    'Content-Type': 'application/json'
  },
  status: response.status
});
