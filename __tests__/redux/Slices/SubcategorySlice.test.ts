import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  SubCategoryState,
  getsubcategoryData,
  setError,
  setSubcategoryData,
} from '../../../src/redux/slice/SubcategorySlice';
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
describe('Subcategory slice', () => {
  let store: ToolkitStore<
    {SubCategoriesData: unknown},
    AnyAction,
    [ThunkMiddleware<{SubCategoriesData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        SubCategoriesData: reducer,
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const productId = '2';
  const mockData = {
    description: 'Gucci black shirt',
    id: '2',
    imageUrl: 'sample-image.jpg',
    subcategoryName: 'shirt',
  };
  it('should return the initial state', () => {
    const initialState = {
      data: {description: '', id: '', imageUrl: '', subcategoryName: ''},
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().SubCategoriesData).toEqual(initialState);
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().SubCategoriesData as SubCategoryState;
    expect(state.isLoader).toBe(false);
    store.dispatch(getsubcategoryData(productId));
    const newState = store.getState().SubCategoriesData as SubCategoryState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchCategoriesProducts.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    return store.dispatch(getsubcategoryData(productId)).then(() => {
      const state = store.getState().SubCategoriesData as SubCategoryState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(mockData);
    });
  });

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(getsubcategoryData(productId)).catch(() => {
      const state = store.getState().SubCategoriesData as SubCategoryState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().SubCategoriesData as SubCategoryState;
    expect(state.error).toEqual(errorPayload);
  });
  it('should handle setProfiledata correctly', () => {
    const newState = reducer(
      undefined,
      setSubcategoryData({
        description: 'Gucci black shirt',
        id: '2',
        imageUrl: 'sample-image.jpg',
        subcategoryName: 'shirt',
      }),
    );

    expect(newState.data.description).toBe('Gucci black shirt');
    expect(newState.data.id).toBe('2');
    expect(newState.data.imageUrl).toBe('sample-image.jpg');
    expect(newState.data.subcategoryName).toBe('shirt');
  });
});
