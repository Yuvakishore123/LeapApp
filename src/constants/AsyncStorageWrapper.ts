import AsyncStorage from '@react-native-async-storage/async-storage';
import {logMessage} from 'helpers/Helper';

const asyncStorageWrapper = {
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      logMessage.error('AsyncStorage setItem error:', error);
      throw error;
    }
  },

  async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ?? null;
    } catch (error) {
      logMessage.error('AsyncStorage getItem error:', error);
      throw error;
    }
  },

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      logMessage.error('AsyncStorage removeItem error:', error);
      throw error;
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      logMessage.error('AsyncStorage clear error:', error);
      throw error;
    }
  },
};

export default asyncStorageWrapper;
