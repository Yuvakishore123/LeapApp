/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import {url} from 'constants/Apis';

import {NavigationContainerRef} from '@react-navigation/native';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StatusCodes} from '../utils/statusCodes';
import {networkStatus} from 'helpers/helper';

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

requestInterceptor(instance);
responseInterceptor(instance);

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
