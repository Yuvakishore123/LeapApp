import {REMOVE_PRODUCT} from '../actions/actions';

const CartReducer = (state = [], action: {type: any; payload: number}) => {
  switch (action.type) {
    case REMOVE_PRODUCT:
      const deletedArray1 = state.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray1;

    default:
      return state;
  }
};

export default CartReducer;
