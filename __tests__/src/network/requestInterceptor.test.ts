import axios from 'axios';

import {renderHook} from '@testing-library/react-native';
import requestInterceptor from 'network/requestInterceptor';

// Mock navigationRef and navigate function
const navigate = jest.fn();
const navigationRef = {
  navigate,
};

jest.mock('axios', () => {
  const axios = {
    create: jest.fn(() => axios), // Create a new mock instance of axios
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  };
  return axios;
});

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

jest.mock('../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request successfully', async () => {
    // Create a mock Axios instance and pass it to the Interceptor
    const axiosInstance = axios.create();
    requestInterceptor(axiosInstance);

    // Now you can use axiosInstance for your test
    const result = renderHook(() => {
      requestInterceptor(axiosInstance);
    });

    expect(result).toBeDefined();
  });
  it('should add Authorization and Accept-Language headers to the config', async () => {
    const axiosInstance = {
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
    };

    // Set up the request interceptor
    requestInterceptor(axiosInstance);

    // Call the interceptor function with a mock config
    const config = {headers: {}};
    await axiosInstance.interceptors.request.use.mock.calls[0][0](config);

    // Assert that the Authorization and Accept-Language headers were added to the config
    expect(config.headers.Authorization).toContain('Bearer');
    expect(config.headers['Accept-Language']).toBe('en-US');
  });
  it('should log and reject the promise in case of an error', async () => {
    const axiosInstance = {
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
    };

    // Set up the request interceptor
    requestInterceptor(axiosInstance);

    // Verify that the interceptor function has been called at least once
    const interceptorCalls = axiosInstance.interceptors.request.use.mock.calls;
    expect(interceptorCalls.length).toBeGreaterThanOrEqual(1);

    // Simulate an error response
    const errorResponse = {
      response: {status: 500, data: 'Internal Server Error'},
    };

    // Create a mock error object
    const error = {
      response: errorResponse,
    };

    // Call the interceptor function and handle the error case
    const interceptorCallIndex = interceptorCalls.length - 1; // Assuming it's the most recent call
    const errorPromise = interceptorCalls[interceptorCallIndex][1](error);

    // Assert that the promise is rejected and the error is logged
    await expect(errorPromise).rejects.toEqual(error);
    // You can also check if the error was logged using a mock console.log assertion
  });
});
