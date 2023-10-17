// Import the action and necessary dependencies
import {url} from 'constants/Apis';
import {
  ADDORDER,
  Init,
  Logout,
  addItemToCart,
  addProductToCartStore,
  addProductToStore,
  addToWishlist,
  deleteAddress,
  getOTP,
  postProductToAPI,
  removeAddress,
  removeFromCart,
  removeFromWishlist,
  removeproducts,
  setRole,
  submitOTP,
} from '../../../src/redux/actions/actions';
import ApiService from 'network/network';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import axios from 'axios';
import {Orderreducer} from '../../../src/redux/reducers/Orderreducer';

// Mock the ApiService.delete function
jest.mock('network/network', () => ({
  delete: jest.fn(),
  post: jest.fn(),
}));
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('removeAddress action', () => {
  beforeEach(() => {
    asyncStorageWrapper.clear();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should dispatch REMOVE_ADDRESS and ListAddress actions', async () => {
    const dispatch = jest.fn();

    (ApiService.delete as jest.Mock).mockResolvedValue({});

    // Invoke the removeAddress action
    await removeAddress('addressId')(dispatch);

    expect(ApiService.delete).toHaveBeenCalledWith(
      expect.stringContaining('/address/delete/'),
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ADDRESS',
      payload: 'addressId',
    });

    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle errors', async () => {
    const dispatch = jest.fn();

    (ApiService.delete as jest.Mock).mockRejectedValue(
      new Error('Error deleting address'),
    );

    await removeAddress('addressId')(dispatch);
    expect(dispatch).not.toHaveBeenCalledWith({
      type: 'REMOVE_ADDRESS',
      payload: 'addressId',
    });

    expect(dispatch).not.toHaveBeenCalledWith(expect.any(Function));
  });
  it('should dispatch getOtp', async () => {
    const dispatch = jest.fn();
    const phone = '123456';
    (ApiService.post as jest.Mock).mockResolvedValue({});

    await getOTP(phone)(dispatch);

    expect(ApiService.post).toHaveBeenCalledWith(
      `${url}/phoneNo?phoneNumber=${phone}`,
      {phoneNumber: phone},
    );
    expect(dispatch).toBeCalledTimes(2);
  });
  it('should handle errors of getOTP', async () => {
    const dispatch = jest.fn();

    (ApiService.post as jest.Mock).mockRejectedValue(new Error('Error getOTP'));

    await getOTP('123456')(dispatch);
    expect(dispatch).not.toHaveBeenCalledWith({
      type: 'VERIFY_OTP_FAILURE',
      payload: 'Error getOTP',
    });
  });
  it('should dispatch Init function', async () => {
    const dispatch = jest.fn();
    asyncStorageWrapper.getItem.mockResolvedValue('mocked_token');
    await Init()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'loginData/setLoginData', // Assuming this is the action type dispatched by setLoginData
      payload: {
        authToken: 'mocked_token',
        isAuthenticated: true,
      },
    });
  });
  it('should handle errors dispatch Init function', async () => {
    const dispatch = jest.fn();

    asyncStorageWrapper.getItem.mockRejectedValue('mocked_token');

    await Init()(dispatch);
    expect(dispatch).not.toHaveBeenCalledWith({
      type: 'loginData/setLoginData', // Assuming this is the action type dispatched by setLoginData
      payload: {
        authToken: 'mocked_token',
        isAuthenticated: true,
      },
    });
  });
  it('should dispatch submitOTP', async () => {
    const dispatch = jest.fn();
    const phoneNumber = '122333211';
    const mockToken = 'token';
    const otp = 12322;
    (ApiService.post as jest.Mock).mockResolvedValue({mockToken});

    await submitOTP(phoneNumber, otp)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOGIN_REQUEST',
    });
    expect(ApiService.post).toHaveBeenCalledWith(
      `${url}/otp?phoneNumber=${phoneNumber}&otp=${otp}`,
      {otp: otp, phoneNumber: phoneNumber},
    );
    expect(dispatch).toBeCalledTimes(2);
  });
  it('should dispatch Logout function', async () => {
    const dispatch = jest.fn();
    asyncStorageWrapper.getItem.mockResolvedValue('refresh_token');
    (ApiService.post as jest.Mock).mockResolvedValue({});
    await Logout()(dispatch);
    asyncStorageWrapper.removeItem.mockResolvedValue('refresh_token');
    expect(axios.post).toHaveBeenCalledWith(`${url}/user/logout`, null, {
      headers: {Authorization: 'Bearer refresh_token'},
    });
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        authToken: null,
        isAuthenticated: false,
      },
      type: 'loginData/setLoginData', // Assuming this is the action type dispatched by setLoginData
    });
  });
  it('should handle errors dispatch Logout function', async () => {
    const dispatch = jest.fn();
    (axios.post as jest.Mock).mockRejectedValue(new Error('Error Logout'));
    await Logout()(dispatch);
    expect(dispatch).not.toHaveBeenCalledWith({
      payload: {
        authToken: null,
        isAuthenticated: false,
      },
      type: 'loginData/setLoginData', // Assuming this is the action type dispatched by setLoginData
    });
  });
  it('should dispatch postProductToAPi', async () => {
    const dispatch = jest.fn();
    const mockId = '1';
    const mockData = {};
    const item = {id: mockId};
    (ApiService.post as jest.Mock).mockResolvedValue({});

    await postProductToAPI(item)(dispatch);

    expect(ApiService.post).toHaveBeenCalledWith(
      `${url}/wishlist/add?productId=${mockId}`,
      mockId,
    );
    expect(dispatch).toHaveBeenCalledWith(addProductToStore(mockData));
  });
  it('should dispatch Addorder', async () => {
    const dispatch = jest.fn();
    const mockId = '1';
    (ApiService.post as jest.Mock).mockResolvedValue({});

    await ADDORDER(mockId)(dispatch);

    expect(ApiService.post).toHaveBeenCalledWith(
      `${url}/order/add?razorpayId=${mockId}`,
      mockId,
    );
    expect(dispatch).toHaveBeenCalledWith(Orderreducer(mockId));
  });
  it('should handle error dispatch Addorder', async () => {
    const dispatch = jest.fn();
    const mockId = '1';
    (ApiService.post as jest.Mock).mockRejectedValue(
      new Error('Error addorder'),
    );

    await ADDORDER(mockId)(dispatch);
    expect(dispatch).not.toHaveBeenCalledWith(Orderreducer(mockId));
  });
  it('setRole should create SET_ROLE action', () => {
    const role = 'admin';
    const expectedAction = {
      type: 'SET_ROLE',
      role,
    };
    expect(setRole(role)).toEqual(expectedAction);
  });

  it('addItemToCart should create ADD_TO_CART action', () => {
    const data = {id: 1, name: 'Product'};
    const expectedAction = {
      type: 'ADD_TO_CART',
      payload: data,
    };
    expect(addItemToCart(data)).toEqual(expectedAction);
  });

  it('removeFromCart should create REMOVE_FROM_CART action', () => {
    const productId = 1;
    const expectedAction = {
      type: 'REMOVE_FROM_CART',
      payload: productId,
    };
    expect(removeFromCart(productId)).toEqual(expectedAction);
  });

  it('removeproducts should create REMOVE_PRODUCT action', () => {
    const productId = 1;
    const expectedAction = {
      type: 'REMOVE_PRODUCT',
      payload: productId,
    };
    expect(removeproducts(productId)).toEqual(expectedAction);
  });

  it('addToWishlist should create ADD_TO_WISHLIST action', () => {
    const data = {id: 1, name: 'Product'};
    const expectedAction = {
      type: 'ADD_TO_WISHLIST',
      payload: data,
    };
    expect(addToWishlist(data)).toEqual(expectedAction);
  });

  it('removeFromWishlist should create REMOVE_FROM_WISHLIST action', () => {
    const productId = 1;
    const expectedAction = {
      type: 'REMOVE_FROM_WISHLIST',
      payload: productId,
    };
    expect(removeFromWishlist(productId)).toEqual(expectedAction);
  });

  it('addProductToCartStore should create ADD_PRODUCT_TO_CART_STORE action', () => {
    const product = {id: 1, name: 'Product'};
    const expectedAction = {
      type: 'ADD_PRODUCT_TO_CART_STORE',
      payload: product,
    };
    expect(addProductToCartStore(product)).toEqual(expectedAction);
  });
  it('delete Address should create DELETE_ACTION action', () => {
    const index = {id: 1};
    const expectedAction = {
      type: 'DELETE_ADDRESS',
      payload: index,
    };
    expect(deleteAddress(index)).toEqual(expectedAction);
  });
});
