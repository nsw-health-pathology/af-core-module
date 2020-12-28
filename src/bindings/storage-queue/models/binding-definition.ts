import { BindingDefinition } from '@azure/functions';

/**
 * Output Binding Definition for a Storage Queue
 */
export interface IStorageQueueOutputBindingDefinition extends BindingDefinition {

  /**
   * Must be set to queue. This property is set automatically when you create
   * the trigger in the Azure portal.
   */
  type: 'queue';

  /**
   * Must be set to out. This property is set automatically when you create the
   * trigger in the Azure portal.
   */
  direction: 'out';

  /**
   * The name of the queue.
   */
  queueName: string;

  /**
   * The name of an app setting that contains the Storage connection string to use
   * for this binding. If the app setting name begins with "AzureWebJobs", you can
   * specify only the remainder of the name here. For example, if you set connection
   * to "MyStorage", the Functions runtime looks for an app setting that is named
   * "MyStorage." If you leave connection empty, the Functions runtime uses the
   * default Storage connection string in the app setting that is named AzureWebJobsStorage.
   */
  connection: string;

}



/**
 * Input Binding Definition for a Storage Queue
 */
export interface IStorageQueueInputBindingDefinition extends BindingDefinition {

  /**
   * Must be set to queueTrigger. This property is set automatically when
   * you create the trigger in the Azure portal.
   */
  type: 'queueTrigger';

  /**
   * Must be set to in. This property is set automatically when you create the
   * trigger in the Azure portal.
   */
  direction: 'in';

  /**
   * The name of the queue to poll.
   */
  queueName: string;

  /**
   * The name of an app setting that contains the Storage connection string to
   * use for this binding. If the app setting name begins with "AzureWebJobs",
   * you can specify only the remainder of the name here. For example, if you
   * set connection to "MyStorage", the Functions runtime looks for an app setting
   * that is named "MyStorage." If you leave connection empty, the Functions
   * runtime uses the default Storage connection string in the app setting that is
   * named AzureWebJobsStorage.
   */
  connection: string;

}
