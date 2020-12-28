import { StatusCodes } from 'http-status-codes';

import { IApiError } from '../../../models';

/** Represents Server Error for when Function is not able to determine the output binding name for the StorageQueue endpoint */
export class StorageQueueOutputBindingMissing extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.INTERNAL_SERVER_ERROR; }
  public get type(): string { return 'https://httpstatuses.com/500'; }
  public get title(): string { return 'STORAGE QUEUE OUTPUT BINDING MISSING'; }

  constructor() {
    super('Output Binding for Storage Queue not found');
  }
}
