/**
 * Model for an Azure Function Timer object
 * See https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=javascript#usage
 */
export interface IAzureFunctionTimer {
  schedule: {
    adjustForDST: boolean;
  };

  scheduleStatus: {
    last: string;
    lastUpdated: string;
    next: string;
  };

  isPastDue: boolean;
}

