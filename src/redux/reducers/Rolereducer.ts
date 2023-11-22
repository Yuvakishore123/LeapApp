import {SET_ROLE} from '../types';

const initialState = {
  role: 'borrower',
};
//To Store the role of the user
const Rolereducer = (
  state = initialState,
  action: {type: string; role: string},
) => {
  if (action.type === SET_ROLE) {
    return {
      ...state,
      role: action.role,
    };
  }

  return state;
};

export default Rolereducer;
