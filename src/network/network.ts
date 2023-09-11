/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import {url} from 'constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainerRef} from '@react-navigation/native';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export function setNavigationReference(
  ref: NavigationContainerRef<BottomTabScreenProps<any>>,
) {
  navigationRef = ref;
}

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
instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem('refresh_token');
      console.log('refresh_token', refreshToken);

      return axios
        .post(`${url}/user/refreshToken`, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then(async response => {
          const newToken = response.headers.access_token;
          console.log('New token generated', newToken);

          await AsyncStorage.setItem('token', newToken);

          // Update the default headers and original request headers with the new token
          instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return instance(originalRequest);
        })
        .catch(error => {
          console.error('Refresh token failed:', error);
          // throw error;
        });
    }

    return Promise.reject(error);
  },
);

const ApiService = {
  get: async (url: string) => {
    try {
      const response = await instance.get(url);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
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
