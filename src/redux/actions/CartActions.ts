import {REMOVE_FROM_CART, REMOVE_PRODUCT} from '../types';

// Action creator for removing a product from the cart in the Redux store
export const removeFromCart = (productId: any) => ({
  // Action type indicating the action to remove a product from the cart
  type: REMOVE_FROM_CART,
  // Payload containing the product ID to be removed
  payload: productId,
});

// Action creator for removing a product from the products list in the Redux store
export const removeproducts = (productId: any) => ({
  // Action type indicating the action to remove a product from the products list
  type: REMOVE_PRODUCT,
  // Payload containing the product ID to be removed
  payload: productId,
});

// Action type for adding a product to the cart store in the Redux store
export const ADD_PRODUCT_TO_CART_STORE = 'ADD_PRODUCT_TO_CART_STORE';

// Action creator for adding a product to the cart store in the Redux store
export const addProductToCartStore = (product: any) => {
  return {
    // Action type indicating the action to add a product to the cart store
    type: ADD_PRODUCT_TO_CART_STORE,
    // Payload containing the product data to be added to the cart store
    payload: product,
  };
};
