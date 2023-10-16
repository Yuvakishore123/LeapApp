import {
  ADDORDER,
  ADD_NAME,
  ADD_PRODUCT_TO_CART_STORE,
  ADD_TO_CART,
  Init,
  Logout,
  addGender,
  addGenderData,
  addItemToCart,
  addItemsData,
  addProductToCartStore,
  addProductToStore,
  addToWishlist,
  addevent,
  addname,
  addoutfit,
  addsize,
  addtype,
  getOTP,
  postProductToAPI,
  removeAddress,
  removeFromCart,
  removeFromWishlist,
  removeproducts,
  setRole,
  submitOTP,
} from '../../../../src/redux/actions/actions';
import ApiService from 'network/network';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('axios');
jest.mock('network/network', () => ({
  delete: jest.fn(),
  post: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AsyncStorageWrapper from '../../../../src/utils/asyncStorage';
import axios from 'axios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('it should render actions', () => {
  const dispatchMock = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });
  it('should dispatch REMOVE_ADDRESS action', async () => {
    const mockId = '2';

    // Create a mock store
    const store = mockStore({});

    // Mock ApiService.delete to resolve without errors
    (ApiService.delete as jest.Mock).mockResolvedValue();

    // Dispatch the removeAddress action with the mock ID
    await store.dispatch(removeAddress(mockId));

    // Define the expected action that should be dispatched
    const expectedAction = {type: 'REMOVE_ADDRESS', payload: mockId};

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected action matches the actual dispatched action
    expect(actualActions).toContainEqual(expectedAction);
  });
  it('should dispatch setLoginData action when token is not null', async () => {
    // Set the mock behavior for AsyncStorageWrapper.getItem
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(
      'mockAuthToken',
    );

    // Create a mock store
    const store = mockStore({});

    // Dispatch the Init action
    await store.dispatch(Init());

    // Define the expected action that should be dispatched
    const expectedAction = [
      {
        type: 'loginData/setLoginData', // Replace with the actual action type
        payload: {authToken: 'mockAuthToken', isAuthenticated: true},
      },
    ];

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected action matches the actual dispatched action
    expect(actualActions).toStrictEqual(expectedAction);
  });
  it('should dispatchthe data setLoginData action when token is null', async () => {
    // Set the mock behavior for AsyncStorageWrapper.getItem
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(null);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the Init action
    await store.dispatch(Init());

    // Define the expected action that should be dispatched

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected action matches the actual dispatched action
    expect(actualActions).toStrictEqual([]);
  });
  it('should dispatch VERIFY_OTP_SUCCESS action when API call is successful', async () => {
    // Set the mock behavior for axios.post to resolve with a mock response
    const mockResponse = {data: 'mockData'};
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the getOTP action with a phone number
    await store.dispatch(getOTP('mockPhoneNumber'));

    // Define the expected action that should be dispatched
    const expectedAction = {
      type: 'VERIFY_OTP_SUCCESS', // Replace with the actual action type
      payload: mockResponse.data,
    };

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected action matches the actual dispatched action
    expect(actualActions).toContainEqual(expectedAction);
  });
  it('should dispatch VERIFY_OTP_FAILURE action when API call fails', async () => {
    // Set the mock behavior for axios.post to reject with a mock error
    const mockError = new Error('API call failed');
    (axios.post as jest.Mock).mockRejectedValue(mockError);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the getOTP action with a phone number
    await store.dispatch(getOTP('mockPhoneNumber'));

    // Define the expected action that should be dispatched
    const expectedAction = {
      type: 'VERIFY_OTP_FAILURE', // Replace with the actual action type
      payload: mockError,
    };

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected action matches the actual dispatched action
    expect(actualActions).toContainEqual(expectedAction);
  });
  it('should dispatch LOGIN_SUCCESS action when API call is successful', async () => {
    // Set the mock behavior for axios.post to resolve with a mock response
    const mockResponse = {
      data: 'mockData',
      headers: {access_token: 'mockToken'},
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the submitOTP action with phone number and OTP
    await store.dispatch(submitOTP('mockPhoneNumber', 1234));

    // Define the expected action that should be dispatched
    const expectedActions = [
      {
        type: 'LOGIN_REQUEST', // Replace with the actual action type
      },
      {
        type: 'LOGIN_SUCCESS', // Replace with the actual success action type
        payload: 'mockToken',
      },
    ];

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected actions match the actual dispatched actions
    expect(actualActions).toEqual(expectedActions);
  });
  it('should dispatch LOGIN_FAILURE action when API call fails', async () => {
    // Set the mock behavior for axios.post to reject with a mock error
    const mockError = new Error('API call failed');
    (axios.post as jest.Mock).mockRejectedValue(mockError);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the submitOTP action with phone number and OTP
    await store.dispatch(submitOTP('mockPhoneNumber', 1234));

    // Define the expected action that should be dispatched
    const expectedAction = {
      type: 'LOGIN_FAILURE', // Replace with the actual failure action type
      payload: mockError,
    };

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected action matches the actual dispatched action
    expect(actualActions).toContainEqual(expectedAction);
  });
  it('should dispatch actions when logout is successful', async () => {
    // Set the mock behavior for axios.post to resolve with a mock response
    const mockResponse = {data: 'Logout successful'};
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the Logout action
    await store.dispatch(Logout());

    // Define the expected actions that should be dispatched
    const expectedActions = [
      {
        type: 'loginData/setLoginData', // Replace with the actual action type
        payload: {authToken: null, isAuthenticated: false},
      },
    ];

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected actions match the actual dispatched actions
    expect(actualActions).toEqual(expectedActions);
  });
  it('should handle errors and dispatch appropriate actions', async () => {
    // Set the mock behavior for axios.post to reject with a mock error
    const mockError = new Error('Logout failed');
    (axios.post as jest.Mock).mockRejectedValue(mockError);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the Logout action
    await store.dispatch(Logout());

    // Define the expected actions that should be dispatched
    const expectedActions = [
      {
        type: 'loginData/setLoginData', // Replace with the actual action type
        payload: {authToken: null, isAuthenticated: false},
      },
    ];

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected actions match the actual dispatched actions
    expect(actualActions).toEqual(expectedActions);
  });
  it('should dispatch actions when adding a product to the wishlist is successful', async () => {
    // Mock ApiService's post method to resolve with a mock response
    const mockResponse = {data: 'Product added to wishlist'};
    // Import the actual ApiService module
    (ApiService.post as jest.Mock).mockResolvedValue(mockResponse);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the postProductToAPI action
    const item = {id: 'your_product_id'}; // Replace with a valid product ID
    await store.dispatch(postProductToAPI(item));

    // Define the expected actions that should be dispatched
    const expectedActions = [
      addProductToStore(mockResponse), // You should have an action creator for this
    ];

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected actions match the actual dispatched actions
    expect(actualActions).toEqual(expectedActions);
  });
  it('should handle errors ', async () => {
    // Mock ApiService's post method to reject with a mock error
    const mockError = new Error('Error adding product to wishlist');

    (ApiService.post as jest.Mock).mockRejectedValue(mockError);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the postProductToAPI action
    const item = {id: 'your_product_id'}; // Replace with a valid product ID
    await store.dispatch(postProductToAPI(item));

    // Define the expected actions that should be dispatched
    const expectedActions: any[] = []; // No actions are expected if an error occurs

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected actions match the actual dispatched actions
    expect(actualActions).toEqual(expectedActions);
  });
  it('should handle errors gracefully and not throw', async () => {
    // Mock ApiService's post method to reject with a mock error
    const mockError = new Error('Error adding product to wishlist');

    (ApiService.post as jest.Mock).mockRejectedValue(mockError);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the postProductToAPI action
    const item = {id: 'your_product_id'}; // Replace with a valid product ID

    // The test is successful if it doesn't throw any unhandled errors
    await store.dispatch(postProductToAPI(item));
  });
});
describe('ADDORDER Action Creator', () => {
  it('should dispatch actions when placing an order is successful', async () => {
    // Mock ApiService's post method to resolve successfully

    (ApiService.post as jest.Mock).mockResolvedValue({});

    // Create a mock store
    const store = mockStore({});

    // Dispatch the ADDORDER action
    const razorpayId = 'your_razorpay_id'; // Replace with a valid Razorpay ID
    await store.dispatch(ADDORDER(razorpayId));

    // Define the expected actions that should be dispatched
    const expectedActions = [
      {
        payload: 'your_razorpay_id',
        type: 'ADD_ORDER',
      },
    ];

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected actions match the actual dispatched actions
    expect(actualActions).toEqual(expectedActions);
  });

  it('should handle errors and dispatch appropriate actions', async () => {
    // Mock ApiService's post method to reject with a mock error
    const mockError = new Error('Error placing the order');

    (ApiService.post as jest.Mock).mockRejectedValue(mockError);

    // Create a mock store
    const store = mockStore({});

    // Dispatch the ADDORDER action
    const razorpayId = 'your_razorpay_id'; // Replace with a valid Razorpay ID
    await store.dispatch(ADDORDER(razorpayId));

    // Define the expected actions that should be dispatched when an error occurs
    const expectedActions: any[] = [];

    // Get the actual dispatched actions from the store
    const actualActions = store.getActions();

    // Assert that the expected actions match the actual dispatched actions
    expect(actualActions).toEqual(expectedActions);
  });
});
describe('addname Action Creator', () => {
  it('should create an action to add a name', () => {
    const name = 'John Doe'; // Replace with the test value

    // Define the expected action
    const expectedAction = {
      type: ADD_NAME,
      payload: name,
    };

    // Call the action creator with the test value
    const action = addname(name);

    // Assert that the action created by the action creator matches the expected action
    expect(action).toEqual(expectedAction);
  });
});
describe('addProductToCartStore Action Creator', () => {
  it('should create an action to add to cart', () => {
    const product = [
      {
        id: '1',
        name: 'Mockdata',
      },
    ]; // Replace with the test value

    // Define the expected action
    const expectedAction = {
      type: ADD_PRODUCT_TO_CART_STORE,
      payload: product,
    };

    // Call the action creator with the test value
    const action = addProductToCartStore(product);

    // Assert that the action created by the action creator matches the expected action
    expect(action).toEqual(expectedAction);
  });
});
describe('addItemToCart Action Creator', () => {
  it('should create an action to add an item to the cart', () => {
    const itemData = {id: 1, name: 'Product A'}; // Replace with your test data

    // Define the expected action
    const expectedAction = {
      type: ADD_TO_CART,
      payload: itemData,
    };

    // Call the action creator with the test data
    const action = addItemToCart(itemData);

    // Assert that the action created by the action creator matches the expected action
    expect(action).toEqual(expectedAction);
  });
});
describe('Action Creators', () => {
  it('should create an action to add a name', () => {
    const name = 'John Doe'; // Replace with your test data
    const expectedAction = {
      type: 'ADD_NAME',
      payload: name,
    };
    const action = addname(name);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add a type', () => {
    const subcategoryIds = [1, 2, 3]; // Replace with your test data
    const expectedAction = {
      type: 'ADD_TYPE',
      payload: subcategoryIds,
    };
    const action = addtype(subcategoryIds);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add an outfit', () => {
    const subcategoryIds = [4, 5, 6]; // Replace with your test data
    const expectedAction = {
      type: 'ADD_TYPE',
      payload: subcategoryIds,
    };
    const action = addoutfit(subcategoryIds);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add items data', () => {
    const description = 'Item description'; // Replace with your test data
    const expectedAction = {
      type: 'ADD_DESCRIPTION',
      payload: description,
    };
    const action = addItemsData(description);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add gender', () => {
    const categoryId = 1; // Replace with your test data
    const expectedAction = {
      type: 'ADD_GENDER',
      payload: categoryId,
    };
    const action = addGender(categoryId);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add an event', () => {
    const subcategoryIds = [7, 8, 9]; // Replace with your test data
    const expectedAction = {
      type: 'ADD_EVENT',
      payload: subcategoryIds,
    };
    const action = addevent(subcategoryIds);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add size', () => {
    const selected = 'Medium'; // Replace with your test data
    const expectedAction = {
      type: 'ADD_SIZE',
      payload: selected,
    };
    const action = addsize(selected);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add an item to the cart', () => {
    const itemData = {id: 1, name: 'Product A'}; // Replace with your test data
    const expectedAction = {
      type: 'ADD_TO_CART',
      payload: itemData,
    };
    const action = addItemToCart(itemData);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to remove an item from the cart', () => {
    const productId = 2; // Replace with your test data
    const expectedAction = {
      type: 'REMOVE_FROM_CART',
      payload: productId,
    };
    const action = removeFromCart(productId);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to remove a product', () => {
    const productId = 3; // Replace with your test data
    const expectedAction = {
      type: 'REMOVE_PRODUCT',
      payload: productId,
    };
    const action = removeproducts(productId);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add an item to the wishlist', () => {
    const itemData = {id: 4, name: 'Product B'}; // Replace with your test data
    const expectedAction = {
      type: 'ADD_TO_WISHLIST',
      payload: itemData,
    };
    const action = addToWishlist(itemData);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to remove an item from the wishlist', () => {
    const productId = 5; // Replace with your test data
    const expectedAction = {
      type: 'REMOVE_FROM_WISHLIST',
      payload: productId,
    };
    const action = removeFromWishlist(productId);
    expect(action).toEqual(expectedAction);
  });
  it('should create an action to add gender data', () => {
    const genderData = 'Male'; // Replace with your test data
    const expectedAction = {
      type: 'ADD_GENDER_DATA',
      payload: genderData,
    };
    const action = addGenderData(genderData);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to set the role', () => {
    const role = 'Admin'; // Replace with your test data
    const expectedAction = {
      type: 'SET_ROLE',
      role,
    };
    const action = setRole(role);
    expect(action).toEqual(expectedAction);
  });
});
