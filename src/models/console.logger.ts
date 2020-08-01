import { Logger } from '@azure/functions';

/**
 * Function interface that implements the Azure Function
 * Logger interface
 */
const ConsoleLoggerFunction = () => {

  // Define functions required on Logger interface

  // tslint:disable: completed-docs
  // tslint:disable: no-any
  // tslint:disable: no-unsafe-any
  function log(...args: any[]): void { console.info('LOG: ', JSON.stringify(args[0])); }
  function error(...args: any[]): void { console.error('ERROR: ', JSON.stringify(args[0])); }
  function warn(...args: any[]): void { console.warn('WARN: ', JSON.stringify(args[0])); }
  function info(...args: any[]): void { console.info('INFO: ', JSON.stringify(args[0])); }
  function verbose(...args: any[]): void { console.debug('DEBUG: ', JSON.stringify(args[0])); }
  // tslint:enable: completed-docs
  // tslint:enable: no-any
  // tslint:enable: no-unsafe-any

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
export const ConsoleLogger: Logger = ConsoleLoggerFunction();
