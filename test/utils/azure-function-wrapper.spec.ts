import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { BadRequestError } from '../../src/models';
import { azureFunctionWrapper } from '../../src/utils/azure-function-wrapper';

describe('azureFunctionWrapper', () => {
  it('should return json response on success', async () => {

    const response = await azureFunctionWrapper(async () =>
      ({
        body: { version: '1.0.0' },
        status: StatusCodes.OK
      }));

    expect(response.body).to.be.deep.equal({ version: '1.0.0' });
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.headers).to.be.deep.equal({ 'Content-Type': 'application/json' });

  });

  it('should return xml response if defined on return header', async () => {

    const response = await azureFunctionWrapper(async () =>
      ({
        body: { version: '1.0.0' },
        status: StatusCodes.OK,
        headers: { 'Content-Type': 'application/xml' }
      }));

    expect(response.body).to.be.deep.equal({ version: '1.0.0' });
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.headers).to.be.deep.equal({ 'Content-Type': 'application/xml' });

  });

  it('should include custom http headers on response', async () => {

    const response = await azureFunctionWrapper(async () =>
      ({
        body: { version: '1.0.0' },
        status: StatusCodes.OK,
        headers: { 'X_IDENTITY-TOKEN': 'User123' }
      }));

    expect(response.body).to.be.deep.equal({ version: '1.0.0' });
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.headers).to.be.deep.equal({ 'Content-Type': 'application/json', 'X_IDENTITY-TOKEN': 'User123' });

  });


  it('should return http error response on api error', async () => {

    const response = await azureFunctionWrapper(async () => {
      throw new BadRequestError('Missing request body');
    });

    expect(response.body).to.be.deep.equal({
      additionalInformation: undefined,
      detail: 'Missing request body',
      status: StatusCodes.BAD_REQUEST,
      title: 'BAD REQUEST',
      type: 'https://httpstatuses.com/400'
    });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
  });

  it('should internal server error response on generic error', async () => {

    const response = await azureFunctionWrapper(async () => {
      throw new Error('The milks gone bad');
    });

    expect(response.body).to.be.deep.equal({
      additionalInformation: undefined,
      detail: 'The milks gone bad',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      title: 'INTERNAL SERVER ERROR',
      type: 'https://httpstatuses.com/500'
    });
    expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
