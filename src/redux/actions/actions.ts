import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AnyAction, Dispatch} from 'redux';
import {url} from '../../constants/Apis';

import {ThunkDispatch} from 'redux-thunk';
import {SetStateAction} from 'react';
import {Orderreducer} from '../reducers/Orderreducer';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const OTP_REQUEST = 'OTP_REQUEST';
export const OTP_SUCCESS = 'OTP_SUCCESS';
export const OTP_FAILURE = 'OTP_FAILURE';
export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';
export const ADD_NAME = 'ADD_NAME';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_GENDER = 'ADD_GENDER';
export const ADD_EVENT = 'ADD_EVENT';
export const ADD_SIZE = 'ADD_SIZE';
export const ADD_TYPE = 'ADD_TYPE';
export const ADD_OUTFIT = 'ADD_OUTFIT';
export const SET_ROLE = 'SET_ROLE';
export const ADD_ORDER = 'ADD_ORDER';
//-------------------------------------------changes for wishlist and cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
import {setLoginData} from '../slice/loginSlice';
import {ListAddress} from '../slice/listAddressSlice';
import ApiService from 'network/network';
import {logMessage} from 'helpers/helper';

export const addname = (Name: any) => ({
  type: ADD_NAME,
  payload: Name,
});
export const addtype = (subcategoryIds: any) => ({
  type: ADD_TYPE,
  payload: subcategoryIds,
});
export const addoutfit = (subcategoryIds: any) => ({
  type: ADD_TYPE,
  payload: subcategoryIds,
});
export const addItemsData = (Description: any) => ({
  type: ADD_DESCRIPTION,
  payload: Description,
});
export const addGender = (CategoryId: any) => ({
  type: ADD_GENDER,
  payload: CategoryId,
});
export const addevent = (subcategoryIds: any) => ({
  type: ADD_EVENT,
  payload: subcategoryIds,
});
export const addsize = (selected: any) => ({
  type: ADD_SIZE,
  payload: selected,
});
export const removeAddress = (id: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${url}/address/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({type: REMOVE_ADDRESS, payload: id});
      dispatch(ListAddress as any);
    } catch (error) {}
  };
};

export const Init = () => {
  const {log} = logMessage();
  return async (dispatch: Dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      if (token !== null) {
        dispatch(setLoginData({authToken: token, isAuthenticated: true}));
      }
    } catch (error) {
      log.error('error in Init:', error);
    }
  };
};

export const getOTP = (phoneNumber: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({type: VERIFY_OTP_REQUEST});
    try {
      const response = await axios.post(
        `${url}/phoneNo?phoneNumber=${phoneNumber}`,
        {
          phoneNumber,
        },
      );

      dispatch({type: VERIFY_OTP_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: VERIFY_OTP_FAILURE, payload: error});
    }
  };
};
export const submitOTP = (phoneNumber: string, otp: number) => {
  return async (dispatch: Dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
      const response = await axios.post(
        `${url}/otp?phoneNumber=${phoneNumber}&otp=${otp}`,
        {
          phoneNumber: phoneNumber,
          otp: otp,
        },
      );
      const token = response.headers.access_token;
      await AsyncStorage.setItem('token', token);
      dispatch({type: LOGIN_SUCCESS, payload: token});
    } catch (error) {
      dispatch({type: LOGIN_FAILURE, payload: error});
    }
  };
};

export const Logout = () => {
  return async (dispatch: Dispatch) => {
    const {log} = logMessage();
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    try {
      AsyncStorage.removeItem('token');
      dispatch(setLoginData({authToken: null, isAuthenticated: false}));
      const response = await axios.post(`${url}/user/logout`, null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      log.debug(response);
    } catch (error) {
      log.error(error);
    }
  };
};

export const addGenderData = (genderData: SetStateAction<string>) => {
  return {
    type: 'ADD_GENDER_DATA',
    payload: genderData,
  };
};

export const setRole = (role: string) => ({
  type: SET_ROLE,
  role,
});

//===============================================================

//changes done for wishlist and cart

export const addItemToCart = (data: any) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeFromCart = (productId: any) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const removeproducts = (productId: any) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

export const addToWishlist = (data: any) => ({
  type: ADD_TO_WISHLIST,
  payload: data,
});

export const removeFromWishlist = (productId: any) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});

//----------
//changes for wishlist api

// action creator

export const postProductToAPI = (item: {id: any}) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    const {log} = logMessage();
    try {
      const id = item.id;

      // make API call
      const response = await ApiService.post(
        `${url}/wishlist/add?productId=${id}`,
        {
          body: JSON.stringify(item.id),
        },
      );

      // update the Redux store with the response data
      dispatch(addProductToStore(response));
    } catch (error) {
      log.error('error during adding product to cart', error);
    }
  };
};

// action type
export const ADD_PRODUCT_TO_STORE = 'ADD_PRODUCT_TO_STORE';

// action creator
export const addProductToStore = (product: any) => {
  return {
    type: ADD_PRODUCT_TO_STORE,
    payload: product,
  };
};

export const ADDORDER = (razorpayId: string) => {
  const {log} = logMessage();
  return async (dispatch: (arg0: {type: string; payload: any}) => void) => {
    try {
      await ApiService.post(`${url}/order/add/?razorpayId=${razorpayId}`, {});
      dispatch(Orderreducer(razorpayId));
    } catch (error) {
      log.error('error during placing order', error);
    }
  };
};

// action type
export const ADD_PRODUCT_TO_CART_STORE = 'ADD_PRODUCT_TO_CART_STORE';

// action creator
export const addProductToCartStore = (product: any) => {
  return {
    type: ADD_PRODUCT_TO_CART_STORE,
    payload: product,
  };
};
