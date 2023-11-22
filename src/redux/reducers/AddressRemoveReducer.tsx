import {Dispatch} from 'redux';
import {url} from 'constants/Apis';
import ApiService from 'network/network';

import {REMOVE_ADDRESS} from '../types';
import {ListAddress} from '../slice/listAddressSlice';

// Action creator for removing an address
export const removeAddress = (id: any) => {
  return async (dispatch: Dispatch) => {
    try {
      // Make an asynchronous API request to delete the address by ID
      await ApiService.delete(`${url}/address/delete/${id}`);

      // Dispatch an action to update the Redux store indicating the address removal
      dispatch({type: REMOVE_ADDRESS, payload: id});

      // Dispatch an action to fetch the updated list of addresses (assuming ListAddress is an action creator)
      dispatch(ListAddress as any);
    } catch (error) {
      // Handle any errors that occur during the asynchronous operation
    }
  };
};
