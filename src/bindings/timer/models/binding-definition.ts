import { BindingDefinition } from '@azure/functions';

/**
 * Input Binding Definition for a Timer Trigger
 */
export interface ITimerBindingDefinition extends BindingDefinition {

  /**
   * Must be set to "timerTrigger". This property is set automatically when you
   * create the trigger in the Azure portal.
   */
  type: 'timerTrigger';

  /**
   * Must be set to in. This property is set automatically when you create the
   * trigger in the Azure portal.
   */
  direction: 'in';

  /**
   * A {@link https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=javascript#ncrontab-expressions CRON expression}
   * or a {@link https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=javascript#timespan TimeSpan}
   * value.
   *
   * A TimeSpan can be used only for a function app that runs on an App Service Plan.
   * You can put the schedule expression in an app setting and set this property
   * to the app setting name wrapped in % signs, as in this example: "%ScheduleAppSetting%".
   */
  schedule: ScheduleExpression;

  /**
   * If true, the function is invoked when the runtime starts.
   * For example, the runtime starts when the function app wakes up after going
   * idle due to inactivity. when the function app restarts due to function changes,
   * and when the function app scales out. So runOnStartup should rarely if ever
   * be set to true, especially in production.
   */
  runOnStartup: boolean;

  /**
   * Set to true or false to indicate whether the schedule should be monitored.
   * Schedule monitoring persists schedule occurrences to aid in ensuring the schedule
   * is maintained correctly even when function app instances restart. If not set
   * explicitly, the default is true for schedules that have a recurrence interval
   * greater than or equal to 1 minute. For schedules that trigger more than once
   * per minute, the default is false.
   */
  useMonitor?: boolean;

}


export type ScheduleExpression = CronExpression | TimeSpanExpression;

/**
 * Azure Functions uses the NCronTab library to interpret NCRONTAB expressions.
 * An NCRONTAB expression is similar to a CRON expression except that it includes
 * an additional sixth field at the beginning to use for time precision in seconds:
 *
 * @example {second} {minute} {hour} {day} {month} {day-of-week}
 * @example 0 * /5 * * * * - every five minutes
 */
export type CronExpression = string;

/**
 * A TimeSpan can be used only for a function app that runs on an App Service Plan.
 *
 * Unlike a CRON expression, a TimeSpan value specifies the time interval between
 * each function invocation. When a function completes after running longer than
 * the specified interval, the timer immediately invokes the function again.
 *
 * Expressed as a string, the TimeSpan format is hh:mm:ss when hh is less than 24.
 * When the first two digits are 24 or greater, the format is dd:hh:mm.
 *
 * @example "01:00:00" - every hour
 */
export type TimeSpanExpression = string;
