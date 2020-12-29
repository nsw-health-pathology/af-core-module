import { Context } from '@azure/functions';

import { LoggingService } from '../../../services';

import { IServiceBusOutputBindingService, ServiceBusIOBinding } from '../abstract';
import { ServiceBusOutputBindingMissing } from '../models';


/** Data Service class for enqueueing messages onto a service bus queue enabled through Azure Function IO Binding */
// tslint:disable-next-line: max-classes-per-file
export class ServiceBusFunctionOutputBindingDataService implements IServiceBusOutputBindingService {
  constructor(
    private readonly functionContext: Context,
    private readonly loggingService: LoggingService
  ) { }

  /**
   * Enqueue a message on the Function Output Binding
   *
   * @param serviceBusMessage The service Bus message
   */
  public enqueueMessageOnOutputBinding(serviceBusMessage: ServiceBusIOBinding, outputBindingName?: string): void {
    // If we want to use session-based message queues, then we will need to use the @azure/service-bus
    // SDK instead of the default NodeJS AzureFunction bindings.
    // This is a known issue as per https://stackoverflow.com/a/42118163/2442468
    // 1. ditch the output binding and use the ServiceBus sdk for node directly
    // 2. instead of node, use C# or F# with the actual BrokeredMessage type
    // 3. have your node function put the result into a queue, which then triggers a C# function to create the exact BrokeredMessage you want
    // Also see https://docs.microsoft.com/en-us/answers/questions/39758/how-to-set-sessionid-while-using-service-bus-as-ou.html

    this.loggingService.info('ServiceBusFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | Start');

    this.loggingService.verbose(
      'ServiceBusFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | Message',
      JSON.stringify(serviceBusMessage)
    );

    if (outputBindingName) {
      // Check that the binding exists
      const binding = this.functionContext.bindingDefinitions.find(b => {
        return b.type === 'serviceBus' && b.direction === 'out' && b.name === outputBindingName;
      });

      if (!binding) {
        throw new ServiceBusOutputBindingMissing();
      }

    }

    // If binding name is not specified, try and infer it from the function context
    if (!outputBindingName) {
      const binding = this.functionContext.bindingDefinitions.find(b => {
        return b.type === 'serviceBus' && b.direction === 'out';
      });

      outputBindingName = binding ? binding.name : undefined;
    }

    if (outputBindingName) {
      this.loggingService.info(
        'ServiceBusFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | ',
        `Writing ServiceBus Message to Output Binding ${outputBindingName}`
      );

      // trackMetric(this.appInsightsService, 'ServiceBusOutputBindingEnqueue');

      this.functionContext.bindings[outputBindingName] = serviceBusMessage;
      this.loggingService.info('ServiceBusFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | End');
    } else {

      // trackMetric(this.appInsightsService, 'ServiceBusOutputBindingMissing');

      // Log error and payload so we can manually replay
      this.loggingService.error(
        'ServiceBusFunctionOutputBindingDataService | enqueueMessageOnOutputBinding | Error',
        'Output Binding for Service Bus Queue not found.'
      );

      throw new ServiceBusOutputBindingMissing();
    }
  }
}
