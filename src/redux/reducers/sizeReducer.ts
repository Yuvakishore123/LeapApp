type SizeAction = {
  type: string;
  payload: string;
};

const initialState = {
  selected: '',
};
//To store the Size selected by the owner wile adding product
const SizeReducer = (state = initialState, action: SizeAction) => {
  if (action.type === 'ADD_SIZE') {
    return {
      ...state,
      selected: action.payload,
    };
  } else {
    return state;
  }
};

export default SizeReducer;
