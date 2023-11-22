import AsyncStorageWrapper from '../../src/utils/asyncStorage';

// Utility for handling request interception in axios instances
const requestInterceptor = (instance: any) => {
  // Intercept requests before they are sent
  instance.interceptors.request.use(
    async (config: {headers: {[x: string]: string; Authorization: string}}) => {
      // Retrieve the user's authentication token from AsyncStorage
      const token = await AsyncStorageWrapper.getItem('token');

      // Set the Authorization header with the retrieved token
      config.headers.Authorization = `Bearer ${token}`;

      // Set the user's preferred language in the Accept-Language header (example: 'en-US')
      const userPreferredLanguage = 'en-US';
      config.headers['Accept-Language'] = userPreferredLanguage;

      // Return the modified request configuration
      return config;
    },
    // Handle request interception errors
    (error: {response: any}) => {
      // Reject the promise with the intercepted error
      return Promise.reject(error);
    },
  );
};

// Export the requestInterceptor function for use in other modules
export default requestInterceptor;
