import axios from 'axios';
import {AppEnvironment} from '../constants/Global';

class HttpService {
  // Initialize the base URL for API requests
  apiBaseURL = AppEnvironment.ApiUrl;

  // Define default headers for JSON requests
  headers = {
    'Content-Type': 'application/json',
  };

  // Define headers for file uploads
  fileHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  // GET Method
  async get(url, queryParams, customHeaders) {
    const headers = {...this.headers, ...(customHeaders || {})};

    try {
      const response = await this.makeRequest('get', url, {
        headers,
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }

  // POST Method
  async post(url, data, queryParams, customHeaders, mediaType) {
    const headers = {...this.headers, ...(customHeaders || {})};

    const responseType = mediaType ? {responseType: 'blob'} : undefined;
    try {
      const response = await this.makeRequest('post', url, data, {
        headers,
        ...responseType,
      });
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }

  // POST Method for file uploads
  async postFile(url, data, queryParams, customHeaders) {
    const headers = {
      ...this.headers,
      ...this.fileHeaders,
      ...(customHeaders || {}),
    };

    try {
      const response = await this.makeRequest('post', url, data, {headers});
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }

  // Generic request method
  async makeRequest(method, url, data, config = {}) {
    try {
      const response = await axios[method](this.apiBaseURL + url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Handle Axios errors
  handleAxiosError(error) {
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        throw error.response.data;
      } else {
        const message = {
          title: 'Server Error',
          content: 'Please try again later',
        };
        error.response.data = {message};
        throw error.response.data;
      }
    } else {
      throw error;
    }
  }
}

// Create an instance of the HTTP service and export it
export const httpService = new HttpService();
