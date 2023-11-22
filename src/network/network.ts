/* eslint-disable @typescript-eslint/no-shadow */

// Axios for making HTTP requests
import axios from 'axios';

// API base URL
import {url} from 'constants/Apis';

// Navigation container reference
import {NavigationContainerRef} from '@react-navigation/native';

// Bottom tab screen props for navigation
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

// Network status check utility
import {networkStatus} from 'helpers/helper';
// Status codes utility
import {StatusCodes} from '../utils/statusCodes';

// Request and response interceptors for axios instance
import requestInterceptor from './requestInterceptor';
import responseInterceptor from './responseInterceptor';

// Navigation container reference variable
let navigationRef: NavigationContainerRef | null = null;

// Function to set the navigation container reference
export function setNavigationReference(
  ref: NavigationContainerRef<BottomTabScreenProps<any>>,
) {
  navigationRef = ref;
}

// Axios instance for making API requests
const instance = axios?.create({
  baseURL: url,
  timeout: 15000,
});

// Apply request and response interceptors to the axios instance
requestInterceptor(instance);
responseInterceptor(instance);

// API Service object with methods for common HTTP requests
const ApiService = {
  // HTTP GET request
  get: async (url: string) => {
    try {
      // Check network status
      const isConnected = await networkStatus();

      // If not connected, navigate to the error screen with a custom status code
      if (!isConnected) {
        navigationRef?.navigate('ApiErrorScreen', {
          status: StatusCodes.NETWORK_ERROR,
        });
        return Promise.reject('No network connection');
      }

      // Make the GET request
      const response = await instance.get(url);

      // Return the data from the response
      return response.data;
    } catch (error: any) {
      // Extract status code from the error response
      const status = error.response?.status;

      // If the status code indicates a not found or under maintenance error, navigate to the error screen
      if (
        status === StatusCodes.NOT_FOUND ||
        status === StatusCodes.UNDER_MAINTAINANCE
      ) {
        navigationRef?.navigate('ApiErrorScreen', {status});
      }

      // Reject the promise with the error
      return Promise.reject(error);
    }
  },

  // HTTP POST request
  post: async (url: string, body: any) => {
    const response = await instance.post(url, body);
    return response;
  },

  // HTTP PUT request
  put: async (url: string, body: any) => {
    const response = await instance.put(url, body);
    return response.data;
  },

  // HTTP DELETE request
  delete: async (url: string) => {
    const response = await instance.delete(url);
    return response.data;
  },
};

// Export the ApiService object for use in the application
export default ApiService;
