import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import 'mocha';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { AxiosHttpDataService } from '../../src/services';
import { IHeaders, IQueryParams } from '../../src/models';

describe('AxiosHttpDataService', () => {

  describe('makeHttpGetCall', () => {

    it('should make an axios GET call', async () => {

      const responseStatus = StatusCodes.OK;
      const responseBody = { version: '1.0.0' };

      // Setup Mock Responses
      nock(/.*/)
        .get('/version')
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpGetCall('/version');

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);

    });

    it('should return http error response on failure', async () => {

      const responseStatus = StatusCodes.UNAUTHORIZED;
      const responseBody = { message: 'Missing API Key' };

      // Setup Mock Responses
      nock(/.*/)
        .get('/version')
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpGetCall('/version');

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);
      expect(response.error).to.be.deep.equal({
        data: responseBody,
        message: 'Request failed with status code 401',
        name: 'Error'
      });
    });


    it('should return internal server error on critical failure', async () => {

      const responseStatus = StatusCodes.INTERNAL_SERVER_ERROR;
      const responseBody = 'API Call Failed. Network Error';

      // Setup Mock Responses
      nock(/.*/)
        .get('/version')
        .replyWithError({
          data: responseBody,
          message: 'Network Error',
          name: 'Error'
        });


      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpGetCall('/version');

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: responseBody,
        message: 'Network Error',
        name: 'Error'
      });
    });

  });

  describe('makeHttpPutCall', () => {
    it('should make an axios PUT call', async () => {

      const responseStatus = StatusCodes.OK;
      const responseBody = { version: '1.0.0' };

      // Setup Mock Responses
      nock(/.*/)
        .put('/version')
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPutCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);

    });

    it('should return http error response on failure', async () => {

      const responseStatus = StatusCodes.UNAUTHORIZED;
      const responseBody = { message: 'Missing API Key' };

      // Setup Mock Responses
      nock(/.*/)
        .put('/version')
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPutCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);
      expect(response.error).to.be.deep.equal({
        data: responseBody,
        message: 'Request failed with status code 401',
        name: 'Error'
      });
    });


    it('should return internal server error on critical failure', async () => {

      const responseStatus = StatusCodes.INTERNAL_SERVER_ERROR;
      const responseBody = 'API Call Failed. Network Error';

      // Setup Mock Responses
      nock(/.*/)
        .put('/version')
        .replyWithError({
          data: responseBody,
          message: 'Network Error',
          name: 'Error'
        });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPutCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: responseBody,
        message: 'Network Error',
        name: 'Error'
      });
    });
  });

  describe('makeHttpPostCall', () => {
    it('should make an axios POST call', async () => {

      const responseStatus = StatusCodes.OK;
      const responseBody = { version: '1.0.0' };

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPost('/version').reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);

    });

    it('should return http error response on failure', async () => {

      const responseStatus = StatusCodes.UNAUTHORIZED;
      const responseBody = { message: 'Missing API Key' };

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPost('/version').reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);
      expect(response.error).to.be.deep.equal({
        data: responseBody,
        message: 'Request failed with status code 401',
        name: 'Error'
      });
    });


    it('should return internal server error on critical failure', async () => {

      const responseStatus = StatusCodes.INTERNAL_SERVER_ERROR;

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPost('/version').networkError();

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: 'API Call Failed. Network Error',
        message: 'Network Error',
        name: 'Error'
      });
    });
  });
});
