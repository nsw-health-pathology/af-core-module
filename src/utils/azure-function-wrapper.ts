import { IApiResponse } from '../models/api-response';
import { azureFunctionJsonResponseFromApiResponse } from '../models/azure-function-response';
import { azureFunctionResponseFromApiError, IApiError } from '../models/errors/api-error';

export const azureFunctionWrapper = async <T>(
  fn: () => Promise<IApiResponse<T>>
) => {
  try {
    const response = await fn();
    return azureFunctionJsonResponseFromApiResponse(response);
  } catch (error) {
    const apiError = error as IApiError;
    return azureFunctionResponseFromApiError(apiError);
  }
};
