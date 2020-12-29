import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { NotFoundError } from '../../../src/models/errors';

describe('NotFoundError', () => {
  it('should return 404 for status code', () => {
    const err = new NotFoundError('User account was not found');

    expect(err.statusCode).to.be.equal(StatusCodes.NOT_FOUND);
    expect(err.type).to.be.equal('https://httpstatuses.com/404');
    expect(err.title).to.be.equal('NOT FOUND');
    expect(err.message).to.be.equal('User account was not found');
  });

  it('should provide default error message', () => {
    const err = new NotFoundError();

    expect(err.statusCode).to.be.equal(StatusCodes.NOT_FOUND);
    expect(err.type).to.be.equal('https://httpstatuses.com/404');
    expect(err.title).to.be.equal('NOT FOUND');
    expect(err.message).to.be.equal('The requested resource was not found');
  });
});
