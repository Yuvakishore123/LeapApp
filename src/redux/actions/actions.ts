import {SET_ROLE, ADD_TO_CART} from '../types';

// Action creator for setting the user role in the Redux store
export const setRole = (role: string) => ({
  // Action type indicating the action to set the user role
  type: SET_ROLE,
  // Payload containing the new user role
  role,
});

// Action creator for adding an item to the cart in the Redux store
export const addItemToCart = (data: any) => ({
  // Action type indicating the action to add an item to the cart
  type: ADD_TO_CART,
  // Payload containing the data of the item to be added to the cart
  payload: data,
});
