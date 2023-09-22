import {ADD_ADDRESS, REMOVE_ADDRESS} from '../actions/actionTypes';

export const AddressReducers = (
  // Initial state is an empty array of addresses
  state = [],
  // Action object contains a type and a payload
  action: {type: any; payload: number},
) => {
  // Switch statement to handle different action types
  switch (action.type) {
    // Case for adding an address
    case ADD_ADDRESS:
      return [...state, action.payload];
    // Case for removing an address
    case REMOVE_ADDRESS:
      const deletedArray1 = state.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray1;
    default:
      return state;
  }
};
