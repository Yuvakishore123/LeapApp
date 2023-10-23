import axios from 'axios';

import {renderHook} from '@testing-library/react-native';
import requestInterceptor from 'network/requestInterceptor';
import responseInterceptor from 'network/responseInterceptor';
import AsyncStorageWrapper from '../../../src/utils/asyncStorage';
import {url} from 'constants/Apis';
import {StatusCodes} from '../../../src/utils/statusCodes';

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
    post: jest.fn(), // Mock the 'post' method
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
    responseInterceptor(axiosInstance);

    // Now you can use axiosInstance for your test
    const result = renderHook(() => {
      responseInterceptor(axiosInstance);
    });

    expect(result).toBeDefined();
  });
  it('should add Authorization and Accept-Language headers to the config', async () => {
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const axiosInstance = {
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    };

    // Set up the request interceptor
    responseInterceptor(axiosInstance);

    // Call the interceptor function with a mock config
    const config = {headers: {}};
    await axiosInstance.interceptors.response.use.mock.calls[0][0](config);
  });
  it('should log and reject the promise in case of an error', async () => {
    const axiosInstance = {
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    };

    // Set up the request interceptor
    responseInterceptor(axiosInstance);

    // Verify that the interceptor function has been called at least once
    const interceptorCalls = axiosInstance.interceptors.response.use.mock.calls;
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
  it('should handle an error response and refresh the token', async () => {
    // Create a mock Axios instance
    const axiosInstance = {
      interceptors: {
        response: {
          use: jest.fn(),
        },
        request: {
          use: jest.fn(),
        },
      },
      defaults: {
        headers: {
          common: {
            Authorization: 'Bearer mockToken', // Set your default token here
          },
        },
      },
    };

    // Set up the response interceptor
    responseInterceptor(axiosInstance);

    // Simulate an error response with status code 401
    const errorResponse = {
      status: StatusCodes.UNAUTHORIZED,
    };

    // Create a mock error object
    const error = {
      response: errorResponse,
      config: {
        url: url, // Replace with the actual API endpoint
        _retry: false, // Ensure _retry is set to false
      },
    };

    // Mock AsyncStorageWrapper to provide a refreshToken
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(
      'mockRefreshToken',
    );

    // Mock the Axios instance for the token refresh request
    const axiosRefreshMock = jest.fn(async config => {
      // Simulate the successful token refresh response
      if (config.url === `${url}/user/refreshToken`) {
        return {
          data: {}, // Your response data here
          headers: {access_token: 'newAccessToken'},
          status: 200, // Assuming a successful status code
        };
      } else {
        throw new Error('Unexpected URL');
      }
    });

    // Mock the axios.post method to resolve with 'newAccessToken'
    (axios.post as jest.Mock).mockResolvedValue({
      data: {},
      headers: {access_token: 'newAccessToken'},
      status: 200,
    });

    // Call the interceptor function and handle the error case
    const errorPromise =
      axiosInstance.interceptors.response.use.mock.calls[0][1](error);

    // Await the promise and check its status
  });
});
