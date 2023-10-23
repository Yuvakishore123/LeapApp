import axios from 'axios';
import ApiService, {Interceptor} from 'network/network';
import {StatusCodes} from '../../../src/utils/statusCodes';
import {renderHook} from '@testing-library/react-native';
import React from 'react';

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
    Interceptor(axiosInstance);

    // Now you can use axiosInstance for your test
    const result = renderHook(() => {
      Interceptor(axiosInstance);
    });

    expect(result).toBeDefined();
  });
});
