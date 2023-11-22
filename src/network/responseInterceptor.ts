import axios from 'axios';
import {url} from 'constants/Apis';
import AsyncStorageWrapper from '../../src/utils/asyncStorage';
import {StatusCodes} from '../../src/utils/statusCodes';

// Utility for handling response interception in axios instances
const responseInterceptor = (instance: any) => {
  // Intercept responses before they are handled
  instance.interceptors?.response.use(
    // Handle successful responses
    (response: any) => {
      // Return the original response
      return response;
    },
    // Handle response errors
    async (error: {config: any; response: {status: number}}) => {
      // Retrieve the original request configuration
      const originalRequest = error.config;

      // Check if the error response status is UNAUTHORIZED and it's not a retry
      if (
        error.response?.status === StatusCodes.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        // Mark the original request as a retry to prevent infinite loops
        originalRequest._retry = true;

        // Retrieve the refresh token from AsyncStorage
        const refreshToken = await AsyncStorageWrapper.getItem('refresh_token');

        // Use a try-catch block to handle the promise from axios.post
        try {
          // Attempt to refresh the access token using the refresh token
          const response = await axios.post(`${url}/user/refreshToken`, null, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          // Retrieve the new access token from the response headers
          const newToken = response.headers.access_token;

          // Update the stored access token in AsyncStorage
          await AsyncStorageWrapper.setItem('token', newToken);

          // Update the default headers and original request headers with the new token
          instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request with the updated token
          return instance(originalRequest);
        } catch (refreshError) {
          // Reject the promise with the refresh error
          return Promise.reject(refreshError);
        }
      }

      // Reject the promise with the original error if it doesn't meet the conditions for refresh
      return Promise.reject(error);
    },
  );
};

// Export the responseInterceptor function for use in other modules
export default responseInterceptor;
