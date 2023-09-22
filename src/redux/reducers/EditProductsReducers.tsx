import {REMOVE_PRODUCT} from '../actions/actionTypes';

const CartReducer = (state = [], action: {type: string; payload: number}) => {
  // Checking if the action type is for removing a product
  if (action.type === REMOVE_PRODUCT) {
    // Creating a new array excluding the product at the specified index
    const deletedArray1 = state.filter((item, index) => {
      return index !== action.payload;
    });
    return deletedArray1;
  }

  return state;
};
//resolved a switch clause bug
export default CartReducer;
