import asyncStorageWrapper from '../../../src/constants/AsyncStorageWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage methods
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Import the mock AsyncStorage

describe('asyncStorageWrapper', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  describe('setItem', () => {
    it('should set item in AsyncStorage', async () => {
      await asyncStorageWrapper.setItem('key', 'value');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('key', 'value');
    });

    it('should throw an error if AsyncStorage.setItem fails', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );

      await expect(asyncStorageWrapper.setItem('key', 'value')).rejects.toThrow(
        'AsyncStorage Error',
      );
    });
  });

  describe('getItem', () => {
    it('should get item from AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('value');

      const result = await asyncStorageWrapper.getItem('key');

      expect(result).toBe('value');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('key');
    });

    it('should return null if AsyncStorage.getItem returns null', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await asyncStorageWrapper.getItem('key');

      expect(result).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('key');
    });

    it('should throw an error if AsyncStorage.getItem fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );

      await expect(asyncStorageWrapper.getItem('key')).rejects.toThrow(
        'AsyncStorage Error',
      );
    });
  });

  describe('removeItem', () => {
    it('should remove item from AsyncStorage', async () => {
      await asyncStorageWrapper.removeItem('key');

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('key');
    });

    it('should throw an error if AsyncStorage.removeItem fails', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );

      await expect(asyncStorageWrapper.removeItem('key')).rejects.toThrow(
        'AsyncStorage Error',
      );
    });
  });

  describe('clear', () => {
    it('should clear AsyncStorage', async () => {
      await asyncStorageWrapper.clear();

      expect(AsyncStorage.clear).toHaveBeenCalled();
    });

    it('should throw an error if AsyncStorage.clear fails', async () => {
      (AsyncStorage.clear as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );

      await expect(asyncStorageWrapper.clear()).rejects.toThrow(
        'AsyncStorage Error',
      );
    });
  });
});
