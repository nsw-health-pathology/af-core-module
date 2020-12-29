import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { StorageQueueOutputBindingMissing } from '../../../../src/bindings/storage-queue';

describe('StorageQueueOutputBindingMissing', () => {
  it('should return 500 for status code', () => {
    const err = new StorageQueueOutputBindingMissing();

    expect(err.statusCode).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(err.type).to.be.equal('https://httpstatuses.com/500');
    expect(err.title).to.be.equal('STORAGE QUEUE OUTPUT BINDING MISSING');
    expect(err.message).to.be.equal('Output Binding for Storage Queue not found');
  });
});
