import { HttpRequest, TraceContext } from '@azure/functions';
import { expect } from 'chai';
import 'mocha';

import {
  ServiceBusFunctionOutputBindingDataService, ServiceBusOutputBindingMissing,
  IServiceBusOutputBindingDefinition
} from '../../../../src/bindings/service-bus';

import { ConsoleLogger } from '../../../../src/models';
import { LoggingService } from '../../../../src/services';

import { MockFunctionContext } from '../../../mocks/mock-function-context';

describe('ServiceBusFunctionOutputBindingDataService', () => {
  it('should enqueue the message when given the correct binding name', () => {

    const bindingName = 'outputStorageQueue';
    const bindingDefinition: IServiceBusOutputBindingDefinition = {
      connection: '', direction: 'out', name: bindingName, queueName: 'OtpSendQueue',
      type: 'serviceBus'
    };

    const context = MockFunctionContext();
    context.bindingDefinitions.push(bindingDefinition);

    const loggingService = new LoggingService(ConsoleLogger);

    const storageQueue = new ServiceBusFunctionOutputBindingDataService(context, loggingService);

    const queueMessage = 'Some Message';
    storageQueue.enqueueMessageOnOutputBinding(queueMessage, bindingName);

    expect(context.bindings[bindingName]).to.be.equal(queueMessage);

  });

  it('should throw an error if the provided binding name does not exist as a binding', () => {

    const bindingName = 'outputStorageQueue';
    const bindingDefinition: IServiceBusOutputBindingDefinition = {
      connection: '', direction: 'out', name: bindingName, queueName: 'OtpSendQueue',
      type: 'serviceBus'
    };

    const context = MockFunctionContext();
    context.bindingDefinitions.push(bindingDefinition);

    const loggingService = new LoggingService(ConsoleLogger);

    const storageQueue = new ServiceBusFunctionOutputBindingDataService(context, loggingService);

    const queueMessage = 'Some Message';
    // tslint:disable-next-line: no-void-expression
    expect(() => { return storageQueue.enqueueMessageOnOutputBinding(queueMessage, 'someOtherBindingName'); })
      .to.throw('Output Binding for Service Bus not found')
      .and.be.instanceOf(ServiceBusOutputBindingMissing);
  });

  it('should auto-resolve the queue name from the context bindings if not explicitly provided', () => {

    const bindingName = 'outputStorageQueue';
    const bindingDefinition: IServiceBusOutputBindingDefinition = {
      connection: '', direction: 'out', name: bindingName, queueName: 'OtpSendQueue',
      type: 'serviceBus'
    };

    const context = MockFunctionContext();
    context.bindingDefinitions.push(bindingDefinition);

    const loggingService = new LoggingService(ConsoleLogger);

    const storageQueue = new ServiceBusFunctionOutputBindingDataService(context, loggingService);

    const queueMessage = 'Some Message';
    storageQueue.enqueueMessageOnOutputBinding(queueMessage);

    expect(context.bindings[bindingName]).to.be.equal(queueMessage);
  });

  it('should throw an error if there is not queue output binding resolved', () => {

    const context = MockFunctionContext();

    const loggingService = new LoggingService(ConsoleLogger);

    const storageQueue = new ServiceBusFunctionOutputBindingDataService(context, loggingService);

    const queueMessage = 'Some Message';
    // tslint:disable-next-line: no-void-expression
    expect(() => { return storageQueue.enqueueMessageOnOutputBinding(queueMessage); })
      .to.throw('Output Binding for Service Bus not found')
      .and.be.instanceOf(ServiceBusOutputBindingMissing);
  });

  it('should enqueue message on the first found output binding, not all of them', () => {

    const bindingName = 'outputStorageQueue';
    const alternativeBindingName = 'AlternativeBindingName';
    const bindingDefinition: IServiceBusOutputBindingDefinition = {
      connection: '', direction: 'out', name: bindingName, queueName: 'OtpSendQueue',
      type: 'serviceBus'
    };

    const context = MockFunctionContext();
    context.bindingDefinitions.push(bindingDefinition);
    context.bindingDefinitions.push({ ...bindingDefinition, name: alternativeBindingName });

    const loggingService = new LoggingService(ConsoleLogger);

    const storageQueue = new ServiceBusFunctionOutputBindingDataService(context, loggingService);

    const queueMessage = 'Some Message';
    storageQueue.enqueueMessageOnOutputBinding(queueMessage);

    expect(context.bindings[bindingName]).to.be.equal(queueMessage);
    expect(context.bindings[alternativeBindingName]).to.be.equal(undefined);
  });
});
