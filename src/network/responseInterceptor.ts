import AsyncStorageWrapper from '../../src/utils/asyncStorage';
import {StatusCodes} from '../../src/utils/statusCodes';
import axios from 'axios';
import {url} from 'constants/Apis';

const responseInterceptor = (instance: any) => {
  instance.interceptors?.response.use(
    (response: any) => {
      return response;
    },
    async (error: {config: any; response: {status: number}}) => {
      const originalRequest = error.config;

      if (
        error.response?.status === StatusCodes.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const refreshToken = await AsyncStorageWrapper.getItem('refresh_token');

        // Use a try-catch block to handle the promise from axios.post
        try {
          const response = await axios.post(`${url}/user/refreshToken`, null, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          const newToken = response.headers.access_token;

          await AsyncStorageWrapper.setItem('token', newToken);

          // Update the default headers and original request headers with the new token
          instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};

export default responseInterceptor;
