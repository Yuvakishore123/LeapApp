import {AnyAction} from 'redux';

import ApiService from 'network/network';
import {url} from '../../constants/Apis';
import {ThunkDispatch} from 'redux-thunk';

import {addProductToStore} from '../actions/WishlistActions';
// Action creator for posting a product to the API
export const postProductToAPI = (item: {id: string}) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      // Extract the ID from the item
      const id = item.id;

      // Make an asynchronous API request to add the product to the wishlist
      const response = await ApiService.post(
        `https://8a58-106-51-70-135.ngrok-free.app/api/v1/wishlist?productId=${item.id}`,
        null,
      );

      // Extract the data from the API response
      const data = response;

      // Update the Redux store with the response data using the addProductToStore action creator
      dispatch(addProductToStore(data));
    } catch (error) {}
  };
};
