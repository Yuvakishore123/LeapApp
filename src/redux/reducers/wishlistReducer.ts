import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../actions/actionTypes';

const WishlistReducer = (state = [], action: {type: string; payload: any}) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state, action.payload];

    case REMOVE_FROM_WISHLIST:
      const deletedArray2 = state.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray2;

    default:
      return state;
  }
};

export default WishlistReducer;
