// https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus-output?tabs=javascript#usage
// Access the queue or topic by using context.bindings.<name from function.json>.
// You can assign a string, a byte array, or a JavaScript object (deserialized into JSON) to context.binding.<name>.
export type ServiceBusIOBinding = string | Uint8Array | unknown;


/**
 * General interface for the Service Bus Azure Function Output Binding Data Service
 */
export interface IServiceBusOutputBindingService {

  /**
   * Enqueue a message on the Function Output Binding
   *
   * @param serviceBusMessage The service Bus message
   */
  enqueueMessageOnOutputBinding(serviceBusMessage: ServiceBusIOBinding, outputBindingName?: string): void;
}
