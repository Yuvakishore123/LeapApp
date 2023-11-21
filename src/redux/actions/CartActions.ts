import {REMOVE_FROM_CART, REMOVE_PRODUCT} from '../types';

export const removeFromCart = (productId: any) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const removeproducts = (productId: any) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

// action type
export const ADD_PRODUCT_TO_CART_STORE = 'ADD_PRODUCT_TO_CART_STORE';

// action creator
export const addProductToCartStore = (product: any) => {
  return {
    type: ADD_PRODUCT_TO_CART_STORE,
    payload: product,
  };
};
