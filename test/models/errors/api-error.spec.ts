import { expect } from 'chai';
import 'mocha';

import {
  azureFunctionResponseFromApiError,
  isInstanceOfApiError,
  responsePayloadFromApiError,
  IApiError
} from '../../../src/models/errors';

describe('isInstanceOfApiError', () => {
  it('should return true if the model looks to be of type IAPiError', () => {

    // Model must have status, title, and type to be considered an IApiError

    const err: IApiError = {
      name: 'Internal Server Error',
      message: 'Cannot read property billingDetails of undefined',
      statusCode: 500,
      title: 'Internal Server Error',
      type: 'https://httpstatuses.com/500'
    };

    const isApiError = isInstanceOfApiError(err);
    expect(isApiError).to.be.equal(true);
  });

  it('should return false if the model does not look to be of type IAPiError', () => {

    // Model must have status, title, and type to be considered an IApiError

    const err = {
      name: 'Internal Server Error',
      message: 'Cannot read property billingDetails of undefined',
      // statusCode: 500,
      title: 'Internal Server Error',
      type: 'https://httpstatuses.com/500'
    };

    const isApiError = isInstanceOfApiError(err);
    expect(isApiError).to.be.equal(false);
  });

  it('should return false if the model does not look to be of type IAPiError', () => {
    const isApiError = isInstanceOfApiError(new Error('The milks gone bad!'));
    expect(isApiError).to.be.equal(false);
  });
});


describe('responsePayloadFromApiError', () => {
  it('should generate the model for the Api Error payload', () => {
    const err: IApiError = {
      name: 'Internal Server Error',
      message: 'Cannot read property billingDetails of undefined',
      statusCode: 500,
      title: 'Internal Server Error',
      type: 'https://httpstatuses.com/500'
    };
    const payload = responsePayloadFromApiError(err);
    expect(payload.status).to.be.equal(err.statusCode);
    expect(payload.type).to.be.equal(err.type);
    expect(payload.title).to.be.equal(err.title);
    expect(payload.detail).to.be.equal(err.message);
  });
});

describe('azureFunctionResponseFromApiError ', () => {
  it('should generate the model for the Api Error payload', () => {
    const err: IApiError = {
      name: 'Internal Server Error',
      message: 'Cannot read property billingDetails of undefined',
      statusCode: 500,
      title: 'Internal Server Error',
      type: 'https://httpstatuses.com/500'
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
