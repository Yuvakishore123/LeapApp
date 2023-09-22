import {REMOVE_PRODUCT} from '../actions/actionTypes';

const CartReducer = (state = [], action: {type: string; payload: number}) => {
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
