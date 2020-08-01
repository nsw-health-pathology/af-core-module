import { Logger } from '@azure/functions';

/**
 * Service to allow abstracted logging using multiple
 * logging providers
 */
export class LoggingService {

  private readonly loggers: Logger[] = [];

  constructor(...loggers: Logger[]) {
    this.loggers = loggers;
  }

  // tslint:disable: no-any
  // tslint:disable: no-void-expression

  /**
   * Writes an error level log
   */
  public error(...args: any[]): void {
    this.loggers.forEach(l => l.error(args));
  }

  /**
   * Writes an warn level log
   */
  public warn(...args: any[]): void {
    this.loggers.forEach(l => l.warn(args));
  }

  /**
   * Writes an info level log
   */
  public info(...args: any[]): void {
    this.loggers.forEach(l => l.info(args));
  }

  /**
   * Writes an verbose level log
   */
  public verbose(...args: any[]): void {
    this.loggers.forEach(l => l.verbose(args));
  }

  // tslint:enable: no-any
  // tslint:enable: no-void-expression

}
