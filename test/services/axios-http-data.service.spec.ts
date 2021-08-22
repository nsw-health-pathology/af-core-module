import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';

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

    it('should timeout if no response is received after the specified period', async () => {

      nock(/.*/)
        .get('/version')
        .delay(2000)
        .reply(StatusCodes.OK, 'Operation Success');

      const axiosHttp = new AxiosHttpDataService(Axios);

      const headers = {} as IHeaders;
      const queryParams = {} as IQueryParams;
      const timeout = 1000;
      const retries = 0;

      const response = await axiosHttp.makeHttpGetCall('/version', headers, queryParams, timeout, retries);

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: `API Call Failed. timeout of ${timeout}ms exceeded`,
        message: `timeout of ${timeout}ms exceeded`,
        name: 'Error'
      });
    });

    it('should retry the api request if a timeout is received', async () => {

      const responseStatus = StatusCodes.OK;
      const responseBody = 'Operation Successful';

      // delay the first 2 x api calls by 2000ms
      nock(/.*/)
        .get('/version')
        .twice()
        .delay(2000)
        .reply(responseStatus, responseBody);

      nock(/.*/)
        .get('/version')
        .once()
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);

      const headers = {} as IHeaders;
      const queryParams = {} as IQueryParams;
      const timeout = 1000;
      const retries = 3;

      const response = await axiosHttp.makeHttpGetCall('/version', headers, queryParams, timeout, retries);

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);
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

    it('should timeout if no response is received after the specified period', async () => {

      nock(/.*/)
        .put('/version')
        .delay(2000)
        .reply(StatusCodes.OK, 'Operation Success');

      const axiosHttp = new AxiosHttpDataService(Axios);

      const headers = {} as IHeaders;
      const queryParams = {} as IQueryParams;
      const timeout = 1000;
      const retries = 0;

      const response = await axiosHttp.makeHttpPutCall('/version', {}, headers, timeout, retries);

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: `API Call Failed. timeout of ${timeout}ms exceeded`,
        message: `timeout of ${timeout}ms exceeded`,
        name: 'Error'
      });
    });

    it('should retry the api request if a timeout is received', async () => {

      const responseStatus = StatusCodes.OK;
      const responseBody = 'Operation Successful';

      // delay the first 2 x api calls by 2000ms
      nock(/.*/)
        .put('/version')
        .twice()
        .delay(2000)
        .reply(responseStatus, responseBody);

      nock(/.*/)
        .put('/version')
        .once()
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);

      const headers = {} as IHeaders;
      const queryParams = {} as IQueryParams;
      const timeout = 1000;
      const retries = 3;

      const response = await axiosHttp.makeHttpPutCall('/version', {}, headers, timeout, retries);

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);
    });

  });

  describe('makeHttpPostCall', () => {
    it('should make an axios POST call', async () => {

      const responseStatus = StatusCodes.OK;
      const responseBody = { version: '1.0.0' };

      // Setup Mock Responses
      nock(/.*/)
        .post('/version')
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);

    });

    it('should return http error response on failure', async () => {

      const responseStatus = StatusCodes.UNAUTHORIZED;
      const responseBody = { message: 'Missing API Key' };

      // Setup Mock Responses
      nock(/.*/)
        .post('/version')
        .reply(responseStatus, responseBody);

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
      const responseBody = 'API Call Failed. Network Error';

      // Setup Mock Responses
      nock(/.*/)
        .post('/version')
        .replyWithError({
          data: responseBody,
          message: 'Network Error',
          name: 'Error'
        });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: responseBody,
        message: 'Network Error',
        name: 'Error'
      });
    });

    it('should timeout if no response is received after the specified period', async () => {

      nock(/.*/)
        .post('/version')
        .delay(2000)
        .reply(StatusCodes.OK, 'Operation Success');

      const axiosHttp = new AxiosHttpDataService(Axios);

      const headers = {} as IHeaders;
      const queryParams = {} as IQueryParams;
      const timeout = 1000;
      const retries = 0;

      const response = await axiosHttp.makeHttpPostCall('/version', {}, headers, queryParams, timeout, retries);

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: `API Call Failed. timeout of ${timeout}ms exceeded`,
        message: `timeout of ${timeout}ms exceeded`,
        name: 'Error'
      });
    });

    it('should retry the api request if a timeout is received', async () => {

      const responseStatus = StatusCodes.OK;
      const responseBody = 'Operation Successful';

      // delay the first 2 x api calls by 2000ms
      nock(/.*/)
        .post('/version')
        .twice()
        .delay(2000)
        .reply(responseStatus, responseBody);

      nock(/.*/)
        .post('/version')
        .once()
        .reply(responseStatus, responseBody);

      const axiosHttp = new AxiosHttpDataService(Axios);

      const headers = {} as IHeaders;
      const queryParams = {} as IQueryParams;
      const timeout = 1000;
      const retries = 3;

      const response = await axiosHttp.makeHttpPostCall('/version', {}, headers, queryParams, timeout, retries);

      expect(response.status).to.be.equal(responseStatus);
      expect(response.body).to.be.deep.equal(responseBody);
    });

  });

});
