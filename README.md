# Azure Function - Core Module

This module provides a base set of core tooling support for Azure Functions for the NodeJS runtime.

![Workflow Status](https://img.shields.io/github/workflow/status/nsw-health-pathology/af-app-insights/node-js-build-ci/develop)
![Coverage](https://img.shields.io/coveralls/github/nsw-health-pathology/af-core-module/develop)
![Licence](https://img.shields.io/github/license/nsw-health-pathology/af-app-insights)

- [Azure Function - Core Module](#azure-function---core-module)
  - [Bindings](#bindings)
  - [Models](#models)
    - [Errors](#errors)
  - [Services](#services)
    - [Loging Service](#loging-service)
    - [Axios HTTP Data Service](#axios-http-data-service)
  - [Utilities](#utilities)

## Bindings

Several Azure Function Binding definitions and Data Services

- [Service Bus](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus)
- [Storage Queue](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue)
- [Timer](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=javascript)

## Models

### Errors

The error model definition is build using [RFC 7807](https://tools.ietf.org/html/rfc7807).
Several error class definitions are provided in this module to provide developers with a starting point

When using in conjunction with the `azureFunctionWrapper` utility function, these error definitions
can be used to return HTTP error responses

The following error definitions are included in this module

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 415 Unsupported Media Type
- 500 Internal Server Error

And a custom `DownstreamApiError` class for handling and proxying errors returned from downstream api requests

An example usage:

```typescript
const response = await azureFunctionWrapper(async () => {

  // Validate the semantics of the inbound http request

  if (!req.body || req.body === {}) {
    throw new BadRequestError('Missing request body');
  }

  if (!req.headers || !req.headers['Content-Type'] || req.headers['Content-Type'] !== 'application/json') {
    throw new UnsupportedMediaTypeError();
  }

  // ... Call service layer class to handle request business logic

  return apiResponse;
});

return response;
```

```shell
$ curl -X POST  http://localhost:7075/api/otp/_requestOtp -d'{}'
{
  "status": 400,
  "type": "https://httpstatuses.com/400",
  "title": "BAD REQUEST",
  "detail": "Missing request body"
}
```

## Services

### Loging Service

The `LoggingService` provides an inversion layer between the Azure Functions runtime
`context.log` object, and support for other logging implementations.

A `ConsoleLogger` model is provided in this library for use with the LoggingService.

The Logging Service allows clients to provide a list of log aggregators (log aggregators
must implement the Azure Function Logger interface)

An example usage:

```typescript
const loggingService = new LoggingService(context.log, ConsoleLogger);

loggingService.verbose('Received HTTP Request Body', req.body);
loggingService.info('HTTP trigger function processed a request.');
loggingService.warn('Function Timer Trigger is running late');
loggingService.error('Fatal Error', err);
```

### Axios HTTP Data Service

Axios is the chosen library for HTTP communications with downstream API services.
The `AxiosHttpDataService` class implements the `AbstractHttpDataService` (which
provides a base set of required functionality for developers to implement to make a compliant HTTP data Service.

See the [AF App Insights HTTP Data Service](https://github.com/nsw-health-pathology/af-app-insights) for
an App Insights enabled HTTP client

An example usage:

```typescript
const http = new AxiosHttpDataService(Axios);
const response = await http.makeHttpGetCall('https://www.google.com');
```

## Utilities

The `azureFunctionWrapper` provides a simple to use wrapper for any HTTP based Azure Function trigger.
It safely returns a HTTP Response object model for a controller router and also safely handles exception
error handling.

An example usage:

```typescript

export class VersionController {

  constructor(
    private readonly versionService: IVersionService
  ) { }

  /**
   * GET api for /version
   * Returns the semantically tagged build number of the API
   * @param req The inbound HTTP Request
   */
  async getVersion(req: HttpRequest): Promise<IHttpResponse<IVersionMessage | IHttpErrorResponse>> {

    const response = await azureFunctionWrapper(async () => {
      
      // Code executed inside the azureFunctionWrapper can run safely
      // with error handling in place to catch errors thrown and represent them
      // as a HTTP Error Response

      const version = await this.versionService.getVersion();
      const apiResponse: IApiResponse<IVersionMessage> = {
        body: version,
        status: 200 // Success
      };

      return apiResponse;

    });

    return response;
  }

}

```
