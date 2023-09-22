/* eslint-disable @typescript-eslint/no-shadow */
import axios, {AxiosRequestConfig} from 'axios';
import {url} from 'constants/Apis';
import {NavigationContainerRef} from '@react-navigation/native';
import {RefreshToken_Error} from 'constants/errorCodes';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';

// Store the reference to the navigation container
let navigationRef: NavigationContainerRef | null = null;
export function setNavigationReference(ref: NavigationContainerRef) {
  navigationRef = ref;
}

// Create an Axios instance with specific configuration
const instance = axios.create({
  baseURL: url,
  timeout: 15000,
});

// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    // Add Authorization header with the token from AsyncStorage
    const token = await asyncStorageWrapper.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // If the response is 401 Unauthorized and it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Get the refresh token from AsyncStorage
      const refreshToken = await asyncStorageWrapper.getItem('refresh_token');
      // Send a request to refresh the token
      return axios
        .post(`${url}/user/refreshToken`, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then(async response => {
          const newToken = response.headers.access_token;
          // Update AsyncStorage with the new token
          await asyncStorageWrapper.setItem('token', newToken);

          // Update the default headers and original request headers with the new token
          instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return instance(originalRequest);
        })
        .catch(error => {
          console.error(RefreshToken_Error, error);
          // throw error;
        });
    }

    return Promise.reject(error);
  },
);

// Define an ApiService object with various HTTP methods
const ApiService = {
  get: async (url: string) => {
    try {
      const response = await instance.get(url);

      return response.data;
    } catch (error: any) {
      const status = error.response ? error.response.status : null;
      if (navigationRef) {
        // Navigate to the ApiErrorScreen with the status code as a parameter
        navigationRef.navigate('ApiErrorScreen', {status});
      }
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
  retryRequest: async (originalRequest: AxiosRequestConfig<any>) => {
    try {
      const response = await instance(originalRequest);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default ApiService;
