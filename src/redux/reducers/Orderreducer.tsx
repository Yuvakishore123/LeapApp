// Importing necessary dependencies and modules
import {url} from 'constants/Apis';
import ApiService from 'network/network';
import {logMessage} from 'helpers/helper';

// Action type constant for adding an order
export const ADD_ORDER = 'ADD_ORDER';

//Reducer function for adding an order

export const Orderreducer = (razorpay: string) => {
  return {
    type: ADD_ORDER,
    payload: razorpay,
  };
};

//Async action function for adding an order

export const ADDORDER = (razorpayId: string) => {
  // Destructuring the log function from the logMessage helper
  const {log} = logMessage();

  return async (dispatch: (arg0: {type: string; payload: any}) => void) => {
    try {
      // Making a POST request to add an order using the ApiService
      await ApiService.post(`${url}/order/add/?razorpayId=${razorpayId}`, {});

      // Dispatching the Orderreducer action with the Razorpay ID as payload
      dispatch(Orderreducer(razorpayId));
    } catch (error) {
      // Logging an error message if there is an issue during order placement
      log.error('error during placing order', error);
    }
  };
};
