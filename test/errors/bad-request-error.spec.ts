import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { BadRequestError } from '../../src/models/errors';

describe('BadRequestError', () => {
  it('should return 400 for status code', async () => {
    const err = new BadRequestError('searchValue not specified');

    expect(err.statusCode).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(err.type).to.be.equal('https://httpstatuses.com/400');
    expect(err.title).to.be.equal('BAD REQUEST');
    expect(err.message).to.be.equal('searchValue not specified');
  });
});
