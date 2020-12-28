import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { InternalServerError } from '../../../src/models/errors';

describe('InternalServerError', () => {
  it('should return 500 for status code', () => {
    const err = new InternalServerError(new Error('The milks gone bad'));

    expect(err.statusCode).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(err.type).to.be.equal('https://httpstatuses.com/500');
    expect(err.title).to.be.equal('INTERNAL SERVER ERROR');
    expect(err.message).to.be.equal('The milks gone bad');
  });
});
