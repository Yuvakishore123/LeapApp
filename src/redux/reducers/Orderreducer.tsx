import {url} from 'constants/Apis';
import {logMessage} from 'helpers/helper';
import ApiService from 'network/network';

export const ADD_ORDER = 'ADD_ORDER';

export const Orderreducer = (razorpay: string) => {
  return {
    type: ADD_ORDER,
    payload: razorpay,
  };
};
export const ADDORDER = (razorpayId: string) => {
  const {log} = logMessage();
  return async (dispatch: (arg0: {type: string; payload: any}) => void) => {
    try {
      await ApiService.post(`${url}/order/add/?razorpayId=${razorpayId}`, {});
      dispatch(Orderreducer(razorpayId));
    } catch (error) {
      log.error('error during placing order', error);
    }
  };
};
