import {waitFor} from '@testing-library/react-native';
import axios from 'axios';
import {url} from 'constants/Apis';
import asyncStorageWrapper from 'constants/AsyncStorageWrapper';
import ApiService, {instance, setNavigationReference} from 'network/network';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      addListener: jest.fn(),
      NavigationContainerRef: mockNav,
    }),
  };
});
setNavigationReference({navigate: jest.fn()});
describe('axios request interceptor', () => {
  it('should add Authorization header with access token', async () => {
    const accessToken = 'accessToken';
    const config = {headers: {}};
    asyncStorageWrapper.getItem = jest.fn().mockResolvedValue(accessToken);
    await instance.interceptors.request.handlers[0].fulfilled(config);
    expect(config.headers.Authorization).toBe(`Bearer ${accessToken}`);
  });
  it('should handle 401 Unauthorized error and refresh token', async () => {
    const refreshToken = 'refreshToken';
    const newAccessToken = 'newAccessToken';

    // Mock the error response with status 401
    const error = {
      response: {
        status: 401,
      },
      config: {
        _retry: false,
      },
    };

    // Mock asyncStorageWrapper.getItem to return refreshToken
    asyncStorageWrapper.getItem = jest.fn().mockResolvedValue(refreshToken);

    // Mock the axios.post method
    axios.post = jest.fn().mockResolvedValue({
      headers: {
        access_token: newAccessToken,
      },
    });

    // Mock the original request
    const originalRequest = {
      _retry: false,
      headers: {},
    };

    const updatedRequest = {
      ...originalRequest,
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    };

    // Call the response interceptor
    const result = await instance.interceptors.response.handlers[0].rejected(
      error,
    );

    // Check if axios.post was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(`${url}/user/refreshToken`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // Check if asyncStorageWrapper.setItem was called with the new token
    expect(asyncStorageWrapper.setItem).toHaveBeenCalledWith(
      'token',
      newAccessToken,
    );

    // Check if the original request was updated with the new token
    // expect(result.config).toEqual(updatedRequest);
  });
  it('should make a GET request', async () => {
    // Mocking the Axios get function
    instance.get = jest.fn().mockResolvedValue({data: 'response data'});

    const result = await ApiService.get('/some-url');

    // Check if the function returns the correct data
    expect(result).toBe('response data');

    // Check if Axios.get was called with the correct URL
    expect(instance.get).toHaveBeenCalledWith('/some-url');
  });
  it('should reject to make a GET request', async () => {
    // Mocking the Axios get function to reject with an error message
    instance.get = jest.fn().mockRejectedValue('error in get method');

    try {
      await ApiService.get('/some-url');
    } catch (error) {
      // Check if the function throws an error
      expect(error).toBe('error in get method');

      // Check if navigate function was called with the correct parameters
      waitFor(() => {
        expect(mockNav).toHaveBeenCalledWith('ApiErrorScreen', {status: 401});
      });
    }
  });
  it('should make a POST request', async () => {
    // Mocking the Axios get function
    const data = {};
    instance.post = jest.fn().mockResolvedValue({data: 'response data'});

    const result = await ApiService.post('/some-url', data);

    // Check if the function returns the correct data
    expect(result.data).toBe('response data');

    // Check if Axios.get was called with the correct URL
    expect(instance.post).toHaveBeenCalledWith('/some-url', data);
  });
  it('should make a PUT request', async () => {
    // Mocking the Axios get function
    const data = {};
    instance.put = jest.fn().mockResolvedValue({data: 'response data'});

    const result = await ApiService.put('/some-url', data);

    // Check if the function returns the correct data
    expect(result).toBe('response data');

    // Check if Axios.get was called with the correct URL
    expect(instance.put).toHaveBeenCalledWith('/some-url', data);
  });
  it('should make a DELETE request', async () => {
    // Mocking the Axios get function
    instance.delete = jest.fn().mockResolvedValue({data: 'response data'});

    const result = await ApiService.delete('/some-url');

    // Check if the function returns the correct data
    expect(result).toBe('response data');

    // Check if Axios.get was called with the correct URL
    expect(instance.delete).toHaveBeenCalledWith('/some-url');
  });
});
