import {REMOVE_PRODUCT} from '../types';

// Action creator for removving product to the API
const CartReducer = (state: any[], action: {type: string; payload: number}) => {
  // Filter out the product with the specified index
  if (action.type === REMOVE_PRODUCT) {
    const deletedArray1 = state.filter((item, index) => {
      return index !== action.payload;
    });
    return deletedArray1;
  }

  return state;
};
//resolved a switch clause bug
export default CartReducer;
