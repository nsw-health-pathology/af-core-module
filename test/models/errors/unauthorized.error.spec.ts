import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { UnauthorizedError } from '../../../src/models/errors';

describe('UnauthorizedError', () => {
  it('should return 401 for status code', () => {
    const err = new UnauthorizedError('X-IDENTITY-TOKEN required on request');

    expect(err.statusCode).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(err.type).to.be.equal('https://httpstatuses.com/401');
    expect(err.title).to.be.equal('UNAUTHORIZED');
    expect(err.message).to.be.equal('X-IDENTITY-TOKEN required on request');
  });
});
