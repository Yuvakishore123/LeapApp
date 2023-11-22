import {ADD_PRODUCT_TO_STORE} from '../types';

// Action creator for adding a product to the Redux store
export const addProductToStore = (product: any) => {
  return {
    // Action type indicating the action to add a product to the store
    type: ADD_PRODUCT_TO_STORE,
    // Payload containing the product data to be added
    payload: product,
  };
};
