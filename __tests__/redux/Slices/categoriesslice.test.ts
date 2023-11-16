import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  CategoryState,
  fetchCategoriesData,
  fetchSubcategoryList,
  setData,
  setError,
} from '../../../src/redux/slice/CategorySlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/network';
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
describe('Categories Slice', () => {
  let store: ToolkitStore<
    {CategoriesData: unknown},
    AnyAction,
    [ThunkMiddleware<{CategoriesData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        CategoriesData: reducer,
      },
    });
  });
  const mockCategoryData = {
    description: 'Sample Description',
    id: '1',
    imageUrl: 'sample-image.jpg',
    subcategoryName: 'Sample Subcategory',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    const initialState = {
      data: {description: '', id: '', imageUrl: '', subcategoryName: ''},
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().CategoriesData).toEqual(initialState);
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().CategoriesData as CategoryState;
    expect(state.isLoader).toBe(false);
    store.dispatch(fetchCategoriesData());
    const newState = store.getState().CategoriesData as CategoryState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchCategoriesProducts.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCategoryData);

    return store.dispatch(fetchCategoriesData()).then(() => {
      const state = store.getState().CategoriesData as CategoryState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(mockCategoryData);
    });
  });

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(fetchCategoriesData()).catch(() => {
      const state = store.getState().CategoriesData as CategoryState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle fetchsubCategoriesProducts.pending action', () => {
    const state = store.getState().CategoriesData as CategoryState;
    expect(state.isLoader).toBe(false);
    store.dispatch(fetchSubcategoryList());
    const newState = store.getState().CategoriesData as CategoryState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchsubCategoriesProducts.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCategoryData);

    return store.dispatch(fetchSubcategoryList()).then(() => {
      const state = store.getState().CategoriesData as CategoryState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(mockCategoryData);
    });
  });

  it('should handle fetchsubCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(fetchSubcategoryList()).catch(() => {
      const state = store.getState().CategoriesData as CategoryState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().CategoriesData as CategoryState;
    expect(state.error).toEqual(errorPayload);
  });
  it('should handle setAdressAddData correctly', () => {
    const newState = reducer(
      undefined,
      setData({
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
