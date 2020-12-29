import { BindingDefinition } from '@azure/functions';


/**
 * Input Binding Definition for a Service Bus
 */
export interface IServiceBusInputBindingDefinition extends BindingDefinition {

  /**
   * Must be set to "serviceBusTrigger". This property is set automatically when
   * you create the trigger in the Azure portal.
   */
  type: 'serviceBusTrigger';

  /**
   * Must be set to in. This property is set automatically when you create the
   * trigger in the Azure portal.
   */
  direction: 'in';

  /**
   * Name of the queue to monitor. Set only if monitoring a queue, not for a topic.
   */
  queueName?: string;

  /**
   * Name of the topic to monitor. Set only if monitoring a topic, not for a queue.
   */
  topicName?: string;

  /**
   * Name of the subscription to monitor. Set only if monitoring a topic, not for a queue.
   */
  subscriptionName?: string;

  /**
   * The name of an app setting that contains the Storage connection string to
   * use for this binding. If the app setting name begins with "AzureWebJobs",
   * you can specify only the remainder of the name here. For example, if you
   * set connection to "MyStorage", the Functions runtime looks for an app setting
   * that is named "MyStorage." If you leave connection empty, the Functions
   * runtime uses the default Storage connection string in the app setting that is
   * named AzureWebJobsStorage.
   *
   * To obtain a connection string, follow the steps shown at [Get the management credentials]
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-portal#get-the-connection-string}.
   * The connection string must be for a Service Bus namespace, not limited to a
   * specific queue or topic.
   */
  connection: string;


  /**
   * Access rights for the connection string. Available values are manage and listen.
   * The default is manage, which indicates that the connection has the Manage permission.
   * If you use a connection string that does not have the Manage permission, set accessRights to "listen".
   * Otherwise, the Functions runtime might fail trying to do operations that require manage rights.
   * In Azure Functions version 2.x and higher, this property is not available because the latest
   * version of the Service Bus SDK doesn't support manage operations.
   */
  accessRights: 'manage' | 'listen';

  /** true if connecting to a {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions session-aware}
   * queue or subscription. false otherwise, which is the default value. */
  isSessionsEnabled?: boolean;

}



/**
 * Output Binding Definition for a Service Bus
 */
export interface IServiceBusOutputBindingDefinition extends BindingDefinition {

  /**
   * Must be set to "serviceBus". This property is set automatically when you
   * create the trigger in the Azure portal.
   */
  type: 'serviceBus';

  /**
   * Must be set to out. This property is set automatically when you create the
   * trigger in the Azure portal.
   */
  direction: 'out';

  /**
   * Name of the queue. Set only if sending queue messages, not for a topic.
   */
  queueName?: string;

  /**
   * Name of the topic. Set only if sending topic messages, not for a queue.
   */
  topicName?: string;

  /**
   * The name of an app setting that contains the Storage connection string to use
   * for this binding. If the app setting name begins with "AzureWebJobs", you can
   * specify only the remainder of the name here. For example, if you set connection
   * to "MyStorage", the Functions runtime looks for an app setting that is named
   * "MyStorage." If you leave connection empty, the Functions runtime uses the
   * default Storage connection string in the app setting that is named AzureWebJobsStorage.
   *
   * To obtain a connection string, follow the steps shown at [Get the management credentials]
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-portal#get-the-connection-string}.
   * The connection string must be for a Service Bus namespace, not limited to a
   * specific queue or topic.
   */
  connection: string;

  /**
   * Access rights for the connection string. Available values are manage and listen.
   * The default is manage, which indicates that the connection has the Manage permission.
   * If you use a connection string that does not have the Manage permission, set accessRights to "listen".
   * Otherwise, the Functions runtime might fail trying to do operations that require manage rights.
   * In Azure Functions version 2.x and higher, this property is not available because the latest
   * version of the Service Bus SDK doesn't support manage operations.
   *
   * @deprecated V1 Only
   */
  accessRights?: 'manage' | 'listen';

}


