import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../actions/ActionTypes';

const WishlistReducer = (state = [], action: {type: string; payload: any}) => {
  switch (action.type) {
    // When an item is added to the wishlist
    case ADD_TO_WISHLIST:
      return [...state, action.payload];
    // When an item is removed from the wishlist
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
