/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import {url} from 'constants/Apis';

import {NavigationContainerRef} from '@react-navigation/native';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StatusCodes} from '../utils/statusCodes';
import {networkStatus} from 'helpers/helper';
import AsyncStorageWrapper from '../utils/asyncStorage';
import requestInterceptor from './requestInterceptor';
import responseInterceptor from './responseInterceptor';

let navigationRef: NavigationContainerRef | null = null;
export function setNavigationReference(
  ref: NavigationContainerRef<BottomTabScreenProps<any>>,
) {
  navigationRef = ref;
}

const instance = axios?.create({
  baseURL: url,
  timeout: 15000,
});

// instance.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorageWrapper.getItem('token');
//     config.headers.Authorization = `Bearer ${token}`;
//     const userPreferredLanguage = 'en-US';
//     config.headers['Accept-Language'] = userPreferredLanguage;

//     return config;
//   },
//   error => {
//     console.log('error is', error.response);
//     return Promise.reject(error);
//   },
// );
requestInterceptor(instance);
responseInterceptor(instance);
// instance.interceptors?.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === StatusCodes.UNAUTHORIZED &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       const refreshToken = await AsyncStorageWrapper.getItem('refresh_token');

//       return axios
//         .post(`${url}/user/refreshToken`, null, {
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         })
//         .then(async response => {
//           const newToken = response.headers.access_token;

//           await AsyncStorageWrapper.setItem('token', newToken);

//           // Update the default headers and original request headers with the new token
//           instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;

//           return instance(originalRequest);
//         })
//         .catch(error => {
//           console.error('Refresh token failed:', error);
//         });
//     }

//     return Promise.reject(error);
//   },
// );

const ApiService = {
  get: async (url: string) => {
    try {
      const isConnected = await networkStatus();

      if (!isConnected) {
        // If not connected, pass the custom status code
        navigationRef?.navigate('ApiErrorScreen', {
          status: StatusCodes.NETWORK_ERROR,
        });
        return Promise.reject('No network connection');
      }
      const response = await instance.get(url);

      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      console.log('status', status);
      if (status === StatusCodes.NOT_FOUND || StatusCodes.UNDER_MAINTAINANCE) {
        navigationRef?.navigate('ApiErrorScreen', {status});
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
};

export default ApiService;
