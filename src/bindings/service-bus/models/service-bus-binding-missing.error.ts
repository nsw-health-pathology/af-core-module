import { StatusCodes } from 'http-status-codes';

import { IApiError } from '../../../models';

/** Represents Server Error for when Function is not able to determine the output binding name for the ServiceBus endpoint */
export class ServiceBusOutputBindingMissing extends Error implements IApiError {

  public get statusCode(): number { return StatusCodes.INTERNAL_SERVER_ERROR; }
  public get type(): string { return 'https://httpstatuses.com/500'; }
  public get title(): string { return 'SERVICE BUS OUTPUT BINDING MISSING'; }

  constructor() {
    super('Output Binding for Service Bus not found');
  }
}
