/* eslint-disable @typescript-eslint/naming-convention */
import { Context, ExecutionContext, TraceContext } from '@azure/functions';

import { ConsoleLogger } from '../../src/models';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const MockFunctionContext = () => {

  const traceContext: TraceContext = { traceparent: '', tracestate: '', attributes: {} };
  const executionContext: ExecutionContext = { functionDirectory: '', functionName: '', invocationId: '' };

  const done = (err?: Error | string | null, result?: unknown): void => { /** do nothing */ };

  const functionContext: Context = {
    traceContext, executionContext, done,
    log: ConsoleLogger, invocationId: '', bindings: {}, bindingData: {}, bindingDefinitions: []
  };

  return functionContext;
};
