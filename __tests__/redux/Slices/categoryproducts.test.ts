import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/Network';
import reducer, {
  fetchCategoriesProductsdata,
  setError,
  CategoryProductState,
  setData,
} from '../../../src/redux/slice/CategoryProductsSlice';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
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
describe('categoryproducts', () => {
  let store: ToolkitStore<
    {fetchcategoryProductsData: unknown},
    AnyAction,
    [ThunkMiddleware<{fetchcategoryProductsData: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        fetchcategoryProductsData: reducer,
      },
    });
  });
  const initialState = {
    data: [],
    isLoader: false,
    isError: false,
    error: null,
  };
  const mockId = 20;
  const mockData = {
    availableQuantities: 10,
    brand: 'Gucci',
    categoryIds: [1, 2],
    color: 'black',
    description: 'Gucci Black Shirt is silk',
    disabled: false,
    disabledQuantities: 2,
    id: 1,
    imageUrl: ['Gucci-image-1.jpg', 'Gucci-image-2.jpg'],
    material: 'silk',
    name: 'Gucci Black Shirt',
    price: 99.99,
    rentedQuantities: 3,
    size: 'XXL',
    subcategoryIds: [3, 4],
    totalQuantity: 15,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    expect(store.getState().fetchcategoryProductsData).toEqual(initialState);
  });
  it('should handle fetchCartProducts.fulfilled action', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    await store.dispatch(fetchCategoriesProductsdata(mockId));
    const state = store.getState()
      .fetchcategoryProductsData as CategoryProductState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle fetchCartProducts.rejected action', async () => {
    const mockError = new Error('Some error message');
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    store.dispatch(fetchCategoriesProductsdata(mockId)).catch(() => {
      const state = store.getState()
        .fetchcategoryProductsData as CategoryProductState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setError', () => {
    const payload = {message: 'Error message', status: 'ERROR'};
    const action = setError(payload);
    const newState = reducer(initialState, action);

    expect(newState.data).toEqual(initialState.data); // Ensure data remains the same
    expect(newState.isLoader).toEqual(initialState.isLoader); // Ensure isLoader remains the same
    expect(newState.isError).toBe(initialState.isError); // Ensure isError remains the same
    expect(newState.error).toEqual(payload); // Check the error field
  });
});
