// https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-output?tabs=javascript#usage
// The output queue item is available via context.bindings.<NAME> where <NAME> matches the name defined in function.json.
// You can use a string or a JSON-serializable object for the queue item payload.

export type StorageQueueIOBinding = string | unknown;

/**
 * General interface for the Storage Queue Azure Function Output Binding Data Service
 */
export interface IStorageQueueOutputBindingService {

  /**
   * Enqueue a message on the Function Output Binding
   *
   * @param storageQueueMessage The service Bus message
   */
  enqueueMessageOnOutputBinding(storageQueueMessage: StorageQueueIOBinding, outputBindingName?: string): void;
}
