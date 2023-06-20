import {REMOVE_PRODUCT} from '../actions/actions';

const CartReducer = (state = [], action: {type: string; payload: number}) => {
  if (action.type === REMOVE_PRODUCT) {
    const deletedArray1 = state.filter((item, index) => {
      return index !== action.payload;
    });
    return deletedArray1;
  }

  return state;
};

export default CartReducer;
