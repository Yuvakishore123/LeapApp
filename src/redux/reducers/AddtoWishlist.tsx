import {AnyAction} from 'redux';

import ApiService from 'network/network';
import {url} from '../../constants/Apis';
import {ThunkDispatch} from 'redux-thunk';

import {addProductToStore} from '../actions/WishlistActions';
export const postProductToAPI = (item: {id: any}) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      const id = item.id;
      const response = await ApiService.post(
        `${url}/wishlist/add?productId=${id}`,
        item.id,
      );
      const data = response;
      // update the Redux store with the response data
      dispatch(addProductToStore(data));
    } catch (error) {}
  };
};
