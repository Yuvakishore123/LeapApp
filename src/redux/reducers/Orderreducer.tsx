import {ADD_ORDER} from '../actions/ActionTypes';
// This is an action creator function. It takes a 'razorpay' parameter
// which is a string representing the razorpay details.
export const Orderreducer = (razorpay: string) => {
  return {
    // It returns an action object with a type of ADD_ORDER and a payload
    // containing the 'razorpay' details.
    type: ADD_ORDER,
    payload: razorpay,
  };
};
