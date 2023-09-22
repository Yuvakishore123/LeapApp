type SizeAction = {
  type: string;
  payload: string;
};

const initialState = {
  selected: '', // Initially, no size is selected
};

const SizeReducer = (state = initialState, action: SizeAction) => {
  if (action.type === 'ADD_SIZE') {
    // If the action is of type 'ADD_SIZE', update the selected size
    return {
      ...state,
      selected: action.payload,
    };
  } else {
    return state;
  }
};

export default SizeReducer;
