import { expect } from 'chai';
import * as HttpStatus from 'http-status-codes';
import { } from 'mocha';

import { IApiResponse } from '../../src/models';
import { BadRequestError, DownstreamApiError } from '../../src/models/errors';

describe('DownstreamApiError', () => {
  it('should return downstream status code and error', async () => {

    const response: IApiResponse<BadRequestError> = {
      status: HttpStatus.UNAUTHORIZED,
      body: {
        statusCode: HttpStatus.UNAUTHORIZED,
        name: 'BAD REQUEST',
        title: 'BAD REQUEST',
        type: 'https://httpstatuses.com/400',
        message: 'Invalid Subscription Key'
      }
    };

    const err = new DownstreamApiError(response);

    expect(err.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
    expect(err.type).to.be.equal('https://httpstatuses.com/401');
    expect(err.title).to.be.equal('DOWNSTREAM_API_ERROR');
    expect(err.message).to.be.equal('An error occurred in a downstream request. See additionalInformation for more details');
    expect(err.additionalInformation).to.be.deep.equal(response.body);
  });
});
