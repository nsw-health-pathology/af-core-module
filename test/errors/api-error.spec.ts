import { expect } from 'chai';
import 'mocha';

import {
  azureFunctionResponseFromApiError,
  responsePayloadFromApiError,
  IApiError,
} from '../../src/models/errors';

describe('responsePayloadFromApiError', () => {
  it('should generate the model for the Api Error payload', async () => {
    const err: IApiError = {
      name: 'Internal Server Error',
      message: 'Cannot read property billingDetails of undefined',
      statusCode: 500,
      title: 'Internal Server Error',
      type: 'https://httpstatuses.com/500',
    };
    const payload = responsePayloadFromApiError(err);
    expect(payload.status).to.be.equal(err.statusCode);
    expect(payload.type).to.be.equal(err.type);
    expect(payload.title).to.be.equal(err.title);
    expect(payload.detail).to.be.equal(err.message);
  });
});

describe('azureFunctionResponseFromApiError ', () => {
  it('should generate the model for the Api Error payload', async () => {
    const err: IApiError = {
      name: 'Internal Server Error',
      message: 'Cannot read property billingDetails of undefined',
      statusCode: 500,
      title: 'Internal Server Error',
      type: 'https://httpstatuses.com/500',
    };
    const payload = azureFunctionResponseFromApiError(err);
    expect(payload.body.status).to.be.equal(err.statusCode);
    expect(payload.body.type).to.be.equal(err.type);
    expect(payload.body.title).to.be.equal(err.title);
    expect(payload.body.detail).to.be.equal(err.message);

    expect(payload.headers['Content-Type']).to.be.equal('application/json');
    expect(payload.status).to.be.equal(err.statusCode);
  });
});
