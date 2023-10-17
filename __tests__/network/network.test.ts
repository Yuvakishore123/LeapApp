import axios from 'axios';
import {url} from 'constants/Apis';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import {instance} from 'network/network';
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
describe('axios request interceptor', () => {
  it('should add Authorization header with access token', async () => {
    const accessToken = 'accessToken';
    const config = {headers: {}};
    asyncStorageWrapper.getItem = jest.fn().mockResolvedValue(accessToken);
    await instance.interceptors.request.handlers[0].fulfilled(config);
    expect(config.headers.Authorization).toBe(`Bearer ${accessToken}`);
  });
});
