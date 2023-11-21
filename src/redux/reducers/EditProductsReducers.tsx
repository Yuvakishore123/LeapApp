import {REMOVE_PRODUCT} from '../types';

const CartReducer = (state: any[], action: {type: string; payload: number}) => {
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
