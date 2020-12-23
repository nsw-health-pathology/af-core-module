import { azureFunctionHttpResponseFromApiResponse, IApiResponse } from '../models';
import { azureFunctionResponseFromApiError, isInstanceOfApiError, InternalServerError, IApiError } from '../models/errors/';

export const azureFunctionWrapper = async <T>(
  fn: () => Promise<IApiResponse<T>>
) => {
  try {
    const response = await fn();
    return azureFunctionHttpResponseFromApiResponse(response);
  } catch (error) {

    const e = error as Error;
    if (isInstanceOfApiError(e)) {
      return azureFunctionResponseFromApiError(e);
    }

    // Error was not an instance of an IApiError. Cannot properly handle
    // Return error as an internal server error instead.
    return azureFunctionResponseFromApiError(new InternalServerError(e));
  }
};
