/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/tslint/config */

import { Logger } from '@azure/functions';

/**
 * Function interface that implements the Azure Function
 * Logger interface
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const ConsoleLoggerFunction = () => {

  // Define functions required on Logger interface

  function log(...args: unknown[]): void { console.info('LOG: ', JSON.stringify(args[0])); }
  function error(...args: unknown[]): void { console.error('ERROR: ', JSON.stringify(args[0])); }
  function warn(...args: unknown[]): void { console.warn('WARN: ', JSON.stringify(args[0])); }
  function info(...args: unknown[]): void { console.info('INFO: ', JSON.stringify(args[0])); }
  function verbose(...args: unknown[]): void { console.debug('DEBUG: ', JSON.stringify(args[0])); }

  // Attach sub-function definitions to root level method
  log.error = error;
  log.warn = warn;
  log.info = info;
  log.verbose = verbose;

  // Return root level method
  return log;
};

/**
 * Allows you to write logs to the console using the Azure
 * Logging interface
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsoleLogger: Logger = ConsoleLoggerFunction();
