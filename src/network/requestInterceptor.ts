import AsyncStorageWrapper from '../../src/utils/asyncStorage';

const requestInterceptor = (instance: any) => {
  instance.interceptors.request.use(
    async (config: {headers: {[x: string]: string; Authorization: string}}) => {
      const token = await AsyncStorageWrapper.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
      const userPreferredLanguage = 'en-US';
      config.headers['Accept-Language'] = userPreferredLanguage;

      return config;
    },
    (error: {response: any}) => {
      console.log('error is', error.response);
      return Promise.reject(error);
    },
  );
};
export default requestInterceptor;
