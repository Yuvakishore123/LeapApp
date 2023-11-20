import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  FilteranalyticsState,
  FliterAnalyticslist,
  setData,
} from '../../../src/redux/slice/FliterAnalyticsDataSlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/Network';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('FliterAnalytics Slice', () => {
  let store: ToolkitStore<
    {FliterAnalyticsData: unknown},
    AnyAction,
    [ThunkMiddleware<{FliterAnalyticsData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        FliterAnalyticsData: reducer,
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = {
    formattedStartDate: '2023-09-27T11:55:52.957Z',
    formattedEndDate: '2023-09-25T11:55:52.957Z',
  };
  it('should return the initial state', () => {
    const initialState = {
      data: {
        message: '',
        status: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().FliterAnalyticsData).toEqual(initialState);
  });
  it('should handle fetch FilterAnaalytics.pending action', () => {
    const state = store.getState().FliterAnalyticsData as FilteranalyticsState;
    expect(state.isLoader).toBe(false);
    store.dispatch(FliterAnalyticslist(mockData));
    const newState = store.getState()
      .FliterAnalyticsData as FilteranalyticsState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetch FilterAnaalytics.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    return store.dispatch(FliterAnalyticslist(mockData)).then(() => {
      const state = store.getState()
        .FliterAnalyticsData as FilteranalyticsState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(mockData);
    });
  });

  it('should handle fetch FilterAnaalytics.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(FliterAnalyticslist(mockData)).catch(() => {
      const state = store.getState()
        .FliterAnalyticsData as FilteranalyticsState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setData({
        message: 'FiilterAnalytics Fetched successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('FiilterAnalytics Fetched successfully');
    expect(newState.data.status).toBe('OK');
  });
});
