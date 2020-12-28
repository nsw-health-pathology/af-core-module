import { expect } from 'chai';
import 'mocha';
import { anything, spy, verify } from 'ts-mockito';

import { ConsoleLogger } from '../../src/models';
import { LoggingService } from '../../src/services';

describe('LoggingService', () => {

  describe('Log Error', () => {

    it('Log Error when logger is registered in constructor', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService(logger);
      loggingService.error('The milks gone bad');

      verify(loggerSpy.error(anything())).called();
    });

    it('Log nothing when no loggers are registered', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService();
      loggingService.error('The milks gone bad');

      verify(loggerSpy.error(anything())).never();
    });
  });

  describe('Log info', () => {

    it('Log info when logger is registered in constructor', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService(logger);
      loggingService.info('The milk is ok');

      verify(loggerSpy.info(anything())).called();
    });

    it('Log nothing when no loggers are registered', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService();
      loggingService.info('The milk is ok');

      verify(loggerSpy.info(anything())).never();
    });
  });


  describe('Log warn', () => {

    it('Log warn when logger is registered in constructor', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService(logger);
      loggingService.warn('The milk is getting sour');

      verify(loggerSpy.warn(anything())).called();
    });

    it('Log nothing when no loggers are registered', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService();
      loggingService.warn('The milk is getting sour');

      verify(loggerSpy.warn(anything())).never();
    });
  });


  describe('Log verbose', () => {

    it('Log verbose when logger is registered in constructor', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService(logger);
      loggingService.verbose('The milk is in the fridge');

      verify(loggerSpy.verbose(anything())).called();
    });

    it('Log nothing when no loggers are registered', () => {

      const logger = ConsoleLogger;
      const loggerSpy = spy(logger);

      const loggingService = new LoggingService();
      loggingService.verbose('The milk is in the fridge');

      verify(loggerSpy.verbose(anything())).never();
    });
  });

});
