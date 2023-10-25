import axios from 'axios';
import ApiService from 'network/network';

import {renderHook} from '@testing-library/react-native';
import {StatusCodes} from '../../../src/utils/statusCodes';

// Mock navigationRef and navigate function
const navigate = jest.fn();
const navigationRef = {
  navigate,
};

jest.mock('axios', () => {
  const axiosInstance = {
    create: jest.fn(() => axiosInstance), // Create a new mock instance of axios
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  };

  // Mock the get and post methods of the Axios instance
  axiosInstance.get = jest.fn();
  axiosInstance.post = jest.fn();
  axiosInstance.put = jest.fn();
  axiosInstance.delete = jest.fn();

  return axiosInstance;
});

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

jest.mock('../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const url = 'mock-url';
describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request successfully', async () => {
    const sampleMockData = {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product description',
    };

    // Mock the get method to resolve with sampleMockData
    (axios.get as jest.Mock).mockResolvedValueOnce({data: sampleMockData});

    const result = await ApiService.get('your-mock-url');

    expect(axios.get).toHaveBeenCalledWith('your-mock-url');
    expect(result).toEqual(sampleMockData);
  });
  it('should make a GET request successfully if there is no network', async () => {
    jest.mock('@react-native-community/netinfo', () => ({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      fetch: jest.fn().mockResolvedValue({isConnected: false}), // Ensure isConnected is defined in the mock.
    }));
    const sampleMockData = {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product description',
    };

    // Mock the get method to resolve with sampleMockData
    (axios.get as jest.Mock).mockResolvedValueOnce({data: sampleMockData});

    const result = await ApiService.get('your-mock-url');

    expect(axios.get).toHaveBeenCalledWith('your-mock-url');
    expect(result).toEqual(sampleMockData);
  });
  it('should make a POST request successfully', async () => {
    const sampleMockData = {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product description',
    };

    // Mock the post method to resolve with sampleMockData
    (axios.post as jest.Mock).mockResolvedValueOnce({data: sampleMockData});

    const result = await ApiService.post('your-mock-url', sampleMockData);

    expect(axios.post).toHaveBeenCalledWith('your-mock-url', sampleMockData);
  });
  it('should make a PUT request successfully', async () => {
    const sampleMockData = {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product description',
    };

    // Mock the put method to resolve with sampleMockData
    (axios.put as jest.Mock).mockResolvedValueOnce({data: sampleMockData});

    const result = await ApiService.put('your-mock-url', sampleMockData);

    expect(axios.put).toHaveBeenCalledWith('your-mock-url', sampleMockData);
    expect(result).toEqual(sampleMockData);
  });
  it('should make a DELETE request successfully', async () => {
    const sampleMockData = {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product description',
    };

    // Mock the delete method to resolve with sampleMockData
    (axios.delete as jest.Mock).mockResolvedValueOnce({data: sampleMockData});

    const result = await ApiService.delete('your-mock-url');

    expect(axios.delete).toHaveBeenCalledWith('your-mock-url');
    expect(result).toEqual(sampleMockData);
  });
  it('should handle GET request errors', async () => {
    const mockError = {
      response: {
        status: 404, // Simulate a 404 error
      },
    };

    // Mock the get method to reject with the error
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

    try {
      const result = await ApiService.get('your-mock-url');
    } catch (error) {
      expect(axios.get).toHaveBeenCalledWith('your-mock-url');
      expect(error).toEqual(mockError);
    }
  });
  it('should handle GET request errors for Under Maintainance', async () => {
    const mockError = {
      response: {
        status: StatusCodes.UNDER_MAINTAINANCE, // Simulate a 404 error
      },
    };

    // Mock the get method to reject with the error
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

    try {
      const result = await ApiService.get('your-mock-url');
    } catch (error) {
      expect(axios.get).toHaveBeenCalledWith('your-mock-url');
      expect(error).toEqual(mockError);
    }
  });
});
