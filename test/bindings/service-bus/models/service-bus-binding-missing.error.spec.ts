import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { ServiceBusOutputBindingMissing } from '../../../../src/bindings/service-bus';

describe('ServiceBusOutputBindingMissing', () => {
  it('should return 500 for status code', () => {
    const err = new ServiceBusOutputBindingMissing();

    expect(err.statusCode).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(err.type).to.be.equal('https://httpstatuses.com/500');
    expect(err.title).to.be.equal('SERVICE BUS OUTPUT BINDING MISSING');
    expect(err.message).to.be.equal('Output Binding for Service Bus not found');
  });
});
