import {ADD_PRODUCT_TO_STORE} from '../types';

export const addProductToStore = (product: any) => {
  return {
    type: ADD_PRODUCT_TO_STORE,
    payload: product,
  };
};
