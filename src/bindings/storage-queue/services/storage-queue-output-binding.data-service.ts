import { Context } from '@azure/functions';

import { LoggingService } from '../../../services';

import { StorageQueueIOBinding } from '../abstract';
import { StorageQueueOutputBindingMissing } from '../models';


/** Data Service class for enqueueing messages onto a Azure Storage Table Queue enabled through Azure Function IO Binding */
export class StorageQueueFunctionOutputBindingDataService {
  constructor(
    private readonly functionContext: Context,
    private readonly loggingService: LoggingService
  ) { }

  /**
   * Enqueue a message on the Function Output Binding
   *
   * @param storageQueueMessage The service Bus message
   */
  public enqueueMessageOnOutputBinding(storageQueueMessage: StorageQueueIOBinding, outputBindingName?: string): void {

    this.loggingService.info('StorageQueueFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | Start');

    this.loggingService.verbose(
      'StorageQueueFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | Message',
      JSON.stringify(storageQueueMessage)
    );

    if (outputBindingName) {
      // Check that the binding exists
      const binding = this.functionContext.bindingDefinitions.find(b => {
        return b.type === 'queue' && b.direction === 'out' && b.name === outputBindingName;
      });

      if (!binding) {
        throw new StorageQueueOutputBindingMissing();
      }

    }

    // If binding name is not specified, try and infer it from the function context
    if (!outputBindingName) {
      const binding = this.functionContext.bindingDefinitions.find(b => {
        return b.type === 'queue' && b.direction === 'out';
      });

      outputBindingName = binding ? binding.name : undefined;
    }

    if (outputBindingName) {
      this.loggingService.info(
        'StorageQueueFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | ',
        `Writing StorageQueue Message to Output Binding ${outputBindingName}`
      );

      // trackMetric(this.appInsightsService, 'StorageQueueOutputBindingEnqueue');

      // const base64EncodedData = this.base64Encode(storageQueueMessage);
      this.functionContext.bindings[outputBindingName] = storageQueueMessage;
      this.loggingService.info('StorageQueueFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | End');
    } else {

      // trackMetric(this.appInsightsService, 'StorageQueueOutputBindingMissing');

      this.loggingService.error(
        'StorageQueueFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | Error',
        'Output Binding for Storage Queue not found'
      );

      throw new StorageQueueOutputBindingMissing();
    }
  }
}
