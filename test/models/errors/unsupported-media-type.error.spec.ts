import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { UnsupportedMediaTypeError } from '../../../src/models/errors';

describe('UnsupportedMediaTypeError', () => {
  it('should return 415 for status code', () => {
    const err = new UnsupportedMediaTypeError('application/xml is not accepted. Expected application/json');

    expect(err.statusCode).to.be.equal(StatusCodes.UNSUPPORTED_MEDIA_TYPE);
    expect(err.type).to.be.equal('https://httpstatuses.com/415');
    expect(err.title).to.be.equal('UNSUPPORTED MEDIA TYPE');
    expect(err.message).to.be.equal('application/xml is not accepted. Expected application/json');
  });
});
