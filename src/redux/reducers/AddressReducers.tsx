import {ADD_ADDRESS, REMOVE_ADDRESS} from '../actions/actionTypes';

export const AddressReducers = (
  state = [],
  action: {type: any; payload: number},
) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return [...state, action.payload];

    case REMOVE_ADDRESS:
      const deletedArray1 = state.filter((item, index) => {
        return index !== action.payload;
      });
      return deletedArray1;
    default:
      return state;
  }
};
