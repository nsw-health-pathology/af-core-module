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

  /**
   * Writes an error level log
   */
  public error(...args: unknown[]): void {
    this.loggers.forEach(l => { return l.error(args); });
  }

  /**
   * Writes an warn level log
   */
  public warn(...args: unknown[]): void {
    this.loggers.forEach(l => { return l.warn(args); });
  }

  /**
   * Writes an info level log
   */
  public info(...args: unknown[]): void {
    this.loggers.forEach(l => { return l.info(args); });
  }

  /**
   * Writes an verbose level log
   */
  public verbose(...args: unknown[]): void {
    this.loggers.forEach(l => { return l.verbose(args); });
  }

}
