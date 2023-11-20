import ApiService from 'network/Network';
// Assuming this is the correct path
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import reducer, {
  ProductAddState,
  setProductData,
  ProductAdd,
} from '../../../src/redux/slice/ProductAddSlice';
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
describe('cartThunk Slice', () => {
  const Data = {
    brand: 'Sample Brand',
    categoryIds: [1, 2],
    color: 'Sample Color',
    name: 'Sample Product',
    description: 'Sample Description',
    id: 1,
    imageUrl: ['sample-image-1.jpg', 'sample-image-2.jpg'] as string[],
    material: 'Sample Material',
    price: 99.99,
    totalQuantity: '15',
    size: 'Sample Size',
    subcategoryIds: [3, 4],
  };
  let store: ToolkitStore<
    {ProductAdd: unknown},
    AnyAction,
    [ThunkMiddleware<{ProductAdd: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ProductAdd: reducer, // Assuming you have a slice named 'addressAdd'
      },
    });
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: {
        message: '',
        status: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should handle cartUpdate.pending correctly', () => {
    const state = store.getState().ProductAdd as ProductAddState;

    expect(state.isLoader).toBe(false);

    store.dispatch(ProductAdd(Data as any));

    const newState = store.getState().ProductAdd as ProductAddState;

    expect(newState.isLoader).toBe(true);
  });

  it('should handle cartupdate.fulfilled correctly', async () => {
    jest.spyOn(ApiService, 'post').mockResolvedValue(Data as any);

    await store.dispatch(ProductAdd(Data as any));

    const state = store.getState().ProductAdd as ProductAddState;

    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(Data);
  });

  it('should handle cartupdate.rejected correctly', async () => {
    const errorMessage = 'An error occurred while adding the address';

    jest.spyOn(ApiService, 'post').mockRejectedValueOnce(errorMessage);

    try {
      await store.dispatch(ProductAdd(Data as any));
    } catch (error) {
      const state = store.getState().ProductAdd as ProductAddState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(errorMessage);
    }
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setProductData({
        message: 'Product Add successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('Product Add successfully');
    expect(newState.data.status).toBe('OK');
  });
});
