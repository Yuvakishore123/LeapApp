import axios from 'axios';
import ApiService from '../../src/network/network'; // Import your ApiService
import MockAdapter from 'axios-mock-adapter';

// Mock Axios and create an instance of the MockAdapter
const mockAxios = new MockAdapter(axios);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
// Rest of your imports and test setup...

describe('ApiService', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the Axios mock after each test
  });

  it('should make a GET request', async () => {
    const apiUrl =
      'https://6d08-106-51-70-135.ngrok-free.app/api/v1/category/list'; // Define the URL once

    const mockResponse = {data: 'mocked data'};
    mockAxios.onGet(apiUrl).reply(200, mockResponse);

    const result = await ApiService.get(apiUrl);

    expect(result).toEqual(mockResponse.data);
  });

  // Other test cases...
});
