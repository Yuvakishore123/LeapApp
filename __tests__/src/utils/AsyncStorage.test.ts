import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageWrapper from '../../../src/utils/asyncStorage';
import {logger} from 'react-native-logs';

jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const key = 'testKey';
const value = 'testValue';

describe('AsyncStorageWrapper', () => {
  it('should call AsyncStorage.setItem with the given key and value', async () => {
    await AsyncStorageWrapper.setItem(key, value);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should return the value from AsyncStorage.getItem for the given key', async () => {
    AsyncStorage.getItem.mockResolvedValue(value);
    const result = await AsyncStorageWrapper.getItem(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it('should call AsyncStorage.removeItem with the given key', async () => {
    await AsyncStorageWrapper.removeItem(key);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should call AsyncStorage.clear', async () => {
    await AsyncStorageWrapper.clear();

    expect(AsyncStorage.clear).toHaveBeenCalled();
  });

  it('should log an error and rethrow when AsyncStorage.setItem fails', async () => {
    const error = new Error('AsyncStorage setItem error');
    AsyncStorage.setItem.mockRejectedValue(error);

    try {
      await AsyncStorageWrapper.setItem(key, value);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  it('should log an error and rethrow when AsyncStorage.getItem fails', async () => {
    const error = new Error('AsyncStorage getItem error');
    AsyncStorage.getItem.mockRejectedValue(error);

    try {
      await AsyncStorageWrapper.getItem(key);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  it('should log an error and rethrow when AsyncStorage.removeItem fails', async () => {
    const error = new Error('AsyncStorage removeItem error');
    AsyncStorage.removeItem.mockRejectedValue(error);

    try {
      await AsyncStorageWrapper.removeItem(key);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  it('should log an error and rethrow when AsyncStorage.clear fails', async () => {
    const error = new Error('AsyncStorage clear error');
    AsyncStorage.clear.mockRejectedValue(error);

    try {
      await AsyncStorageWrapper.clear();
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
