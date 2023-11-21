import {url} from 'constants/Apis';
import ApiService from 'network/network';
import {Dispatch} from 'redux';

import {ListAddress} from '../slice/listAddressSlice';
import {REMOVE_ADDRESS} from '../types';

export const removeAddress = (id: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await ApiService.delete(`${url}/address/delete/${id}`);
      dispatch({type: REMOVE_ADDRESS, payload: id});
      dispatch(ListAddress as any);
    } catch (error) {}
  };
};
