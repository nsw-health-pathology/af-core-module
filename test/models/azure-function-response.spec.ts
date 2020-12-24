import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import 'mocha';

import { azureFunctionHttpResponseFromApiResponse, IApiResponse } from '../../src/models';
import { } from '../../src/models/api-response';

/** Mock model for a Version API Response body */
interface IVersionApiResponse {
  version: string;
}

describe('azureFunctionHttpResponseFromApiResponse', () => {
  it('should generate the model for a json api response', async () => {

    const response: IApiResponse<IVersionApiResponse> = {
      body: { version: '1.0.0' },
      status: StatusCodes.OK
    };

    const payload = azureFunctionHttpResponseFromApiResponse(response);
    expect(payload.status).to.be.equal(response.status);
    expect(payload.body).to.be.deep.equal(response.body);
    expect(payload.headers).to.be.deep.equal({ 'Content-Type': 'application/json' });
  });


  it('should generate the model for a xml api response', async () => {

    const response: IApiResponse<string> = {
      body: '<xml>Hello World!</xml>',
      status: StatusCodes.OK,
      headers: { 'Content-Type': 'application/xml' }
    };

    const payload = azureFunctionHttpResponseFromApiResponse(response);
    expect(payload.status).to.be.equal(response.status);
    expect(payload.body).to.be.deep.equal(response.body);
    expect(payload.headers).to.be.deep.equal(response.headers);
  });

});
