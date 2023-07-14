/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import {url} from '../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: url,
  timeout: 15000,
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const ApiService = {
  get: async (url: string) => {
    const response = await instance.get(url);
    return response.data;
  },
  post: async (url: string, body: any) => {
    const response = await instance.post(url, body);
    return response;
  },
  put: async (url: string, body: any) => {
    const response = await instance.put(url, body);
    return response.data;
  },
  delete: async (url: string) => {
    const response = await instance.delete(url);
    return response.data;
  },
};

export default ApiService;
