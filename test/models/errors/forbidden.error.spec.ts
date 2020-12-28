import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { ForbiddenError } from '../../../src/models/errors';

describe('ForbiddenError', () => {
  it('should return 403 for status code', () => {
    const err = new ForbiddenError('User not unauthorised to perform request');

    expect(err.statusCode).to.be.equal(StatusCodes.FORBIDDEN);
    expect(err.type).to.be.equal('https://httpstatuses.com/403');
    expect(err.title).to.be.equal('FORBIDDEN');
    expect(err.message).to.be.equal('User not unauthorised to perform request');
  });
});
