import {SET_ROLE} from '../actions/ActionTypes';

const initialState = {
  role: 'borrower', // Default role is set to 'borrower'
};

const Rolereducer = (
  state = initialState,
  action: {type: string; role: string},
) => {
  // Checking if the action type is SET_ROLE
  if (action.type === SET_ROLE) {
    return {
      ...state,
      role: action.role,
    };
  }

  return state;
};

export default Rolereducer;
