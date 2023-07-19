import {renderHook, act, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiService from '../../../src/network/network';
import useAnalytics from '../../../src/screens/AnalyticsPage/useAnalytics';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue('mock_token'),
  removeItem: jest.fn(),
}));

jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));

jest.mock('rn-fetch-blob', () => ({
  fs: {
    dirs: {
      DownloadDir: '/mock/download/dir',
    },
    writeFile: jest.fn(),
  },
}));

jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn().mockResolvedValue('mock_channel_id'),
  displayNotification: jest.fn().mockResolvedValue(undefined),
}));

global.Blob = jest.fn();

describe('useAnalytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handleAnalytics', async () => {
    const resultData = {data: 'test data'};
    ApiService.get.mockResolvedValueOnce(resultData);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.handleAnalytics();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.Data).toBe(resultData);

    expect(ApiService.get).toHaveBeenCalledWith(expect.any(String));
  });

  test('handleAnalytics - error', async () => {
    ApiService.get.mockRejectedValueOnce(new Error('API error'));

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.handleAnalytics();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    expect(result.current.Data).toBe('');
    expect(ApiService.get).toHaveBeenCalledWith(expect.any(String));
  });

  test('handleOrders', async () => {
    const resultData = ['order1', 'order2'];
    ApiService.get.mockResolvedValueOnce(resultData);

    const {result} = renderHook(() => useAnalytics());

    await act(async () => {
      await result.current.handleOrders();
    });

    expect(result.current.orderData).toBe(resultData);

    expect(ApiService.get).toHaveBeenCalledWith(expect.any(String));
  });

  test('HandlePiechart', async () => {
    const resultData = ['data1', 'data2'];
    ApiService.get.mockResolvedValueOnce(resultData);

    const {result} = renderHook(() => useAnalytics());

    await act(async () => {
      await result.current.HandlePiechart();
    });

    expect(result.current.piechart).toBe(resultData);

    expect(ApiService.get).toHaveBeenCalledWith(expect.any(String));
  });

  test('handleExportpdf', async () => {
    // Mock AsyncStorage
    const mockAsyncStorageGetItem = jest.spyOn(AsyncStorage, 'getItem');
    mockAsyncStorageGetItem.mockResolvedValueOnce('mock_token');

    // Mock RNFetchBlob
    const mockWriteFile = jest.fn();
    jest.mock('rn-fetch-blob', () => ({
      fs: {
        dirs: {
          DownloadDir: '/mock/download/dir',
        },
        writeFile: mockWriteFile,
      },
    }));
    const RNFetchBlobModule = require('rn-fetch-blob');
    RNFetchBlobModule.fs.writeFile = mockWriteFile;

    // Mock FileReader
    const mockFileReader = {
      onloadend: jest.fn(),
      onerror: jest.fn(),
      readAsDataURL: jest.fn(),
      result: 'mock_base64_data_url',
    };
    Object.defineProperty(global, 'FileReader', {
      value: jest.fn(() => mockFileReader),
    });

    // Mock fetch response
    const mockFetchResponse = {
      status: 200,
      headers: {
        get: jest.fn().mockReturnValue('application/pdf'),
      },
      blob: jest.fn(() =>
        Promise.resolve(new Blob(['PDF data'], {type: 'application/pdf'})),
      ),
    };
    global.fetch = jest.fn().mockResolvedValueOnce(mockFetchResponse);

    const {result} = renderHook(() => useAnalytics());

    await act(async () => {
      await result.current.handleExportpdf();
    });

    expect(mockAsyncStorageGetItem).toHaveBeenCalledWith('token');
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
      headers: {
        Authorization: 'Bearer mock_token',
      },
    });
    expect(mockFetchResponse.blob).toHaveBeenCalled();
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  test('CategoriePieData', async () => {
    const resultData = ['category1', 'category2'];
    ApiService.get.mockResolvedValueOnce(resultData);

    const {result} = renderHook(() => useAnalytics());

    await act(async () => {
      await result.current.CategoriePieData();
    });

    expect(result.current.CategoriesPiechart).toBe(resultData);

    expect(ApiService.get).toHaveBeenCalledWith(expect.any(String));
  });

  test('Dashboardyeardata', async () => {
    const resultData = {data: 'test data'};
    ApiService.get.mockResolvedValueOnce(resultData);

    const {result} = renderHook(() => useAnalytics());

    await act(async () => {
      await result.current.Dashboardyeardata();
    });

    expect(result.current.DashboardYearly).toBe(resultData);

    expect(ApiService.get).toHaveBeenCalledWith(expect.any(String));
  });
});
