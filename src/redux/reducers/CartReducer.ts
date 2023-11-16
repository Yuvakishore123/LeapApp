import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/ActionTypes';

const CartReducer = (state = [], action: {type: string; payload: any}) => {
  switch (action.type) {
    // Case for adding an item to the cart
    case ADD_TO_CART:
      return [...state, action.payload];
    // Case for removing an item from the cart
    case REMOVE_FROM_CART:
      const deletedArray = state.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray;

    default:
      return state;
  }
};

export default CartReducer;
