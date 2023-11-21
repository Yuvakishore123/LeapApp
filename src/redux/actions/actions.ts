import {SET_ROLE, ADD_TO_CART} from '../types';

export const setRole = (role: string) => ({
  type: SET_ROLE,
  role,
});

//changes done for wishlist and cart

export const addItemToCart = (data: any) => ({
  type: ADD_TO_CART,
  payload: data,
});
