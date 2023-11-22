import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../types';

//Funtion for aadding and removing the products from wishlist
const WishlistReducer = (state = [], action: {type: string; payload: any}) => {
  switch (action.type) {
    //if not in wishlist add it to wishlist
    case ADD_TO_WISHLIST:
      return [...state, action.payload];
    //if allready in wishlist remove from  wishlist
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
