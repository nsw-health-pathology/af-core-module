import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import 'mocha';

import { StatusCodes } from 'http-status-codes';
import { AxiosHttpDataService } from '../../src/services';

describe('AxiosHttpDataService', () => {

  describe('makeHttpGetCall', () => {

    it('should make an axios GET call', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onGet('/version').reply(StatusCodes.OK, { version: '1.0.0' });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpGetCall('/version', {}, {});

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.deep.equal({ version: '1.0.0' });

    });

    it('should return http error response on failure', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onGet('/version').reply(StatusCodes.UNAUTHORIZED, { message: 'Missing API Key' });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpGetCall('/version', {}, {});

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.be.deep.equal({ message: 'Missing API Key' });
      expect(response.error).to.be.deep.equal({
        data: { message: 'Missing API Key' },
        message: 'Request failed with status code 401',
        name: 'Error'
      });
    });


    it('should return internal server error on critical failure', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onGet('/version').networkError();

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpGetCall('/version', {}, {});

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: 'API Call Failed. Network Error',
        message: 'Network Error',
        name: 'Error'
      });
    });

  });

  describe('makeHttpPutCall', () => {
    it('should make an axios PUT call', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPut('/version').reply(StatusCodes.OK, { version: '1.0.0' });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPutCall('/version', {});

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.deep.equal({ version: '1.0.0' });

    });

    it('should return http error response on failure', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPut('/version').reply(StatusCodes.UNAUTHORIZED, { message: 'Missing API Key' });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPutCall('/version', {});

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.be.deep.equal({ message: 'Missing API Key' });
      expect(response.error).to.be.deep.equal({
        data: { message: 'Missing API Key' },
        message: 'Request failed with status code 401',
        name: 'Error'
      });
    });


    it('should return internal server error on critical failure', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPut('/version').networkError();

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPutCall('/version', {});

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: 'API Call Failed. Network Error',
        message: 'Network Error',
        name: 'Error'
      });
    });
  });

  describe('makeHttpPostCall', () => {
    it('should make an axios POST call', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPost('/version').reply(StatusCodes.OK, { version: '1.0.0' });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.deep.equal({ version: '1.0.0' });

    });

    it('should return http error response on failure', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPost('/version').reply(StatusCodes.UNAUTHORIZED, { message: 'Missing API Key' });

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.be.deep.equal({ message: 'Missing API Key' });
      expect(response.error).to.be.deep.equal({
        data: { message: 'Missing API Key' },
        message: 'Request failed with status code 401',
        name: 'Error'
      });
    });


    it('should return internal server error on critical failure', async () => {

      // Setup Mock Responses
      const mockAxios = new MockAdapter(Axios);
      mockAxios.onPost('/version').networkError();

      const axiosHttp = new AxiosHttpDataService(Axios);
      const response = await axiosHttp.makeHttpPostCall('/version', {});

      expect(response.status).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.be.deep.equal({});
      expect(response.error).to.be.deep.equal({
        data: 'API Call Failed. Network Error',
        message: 'Network Error',
        name: 'Error'
      });
    });
  });
});
