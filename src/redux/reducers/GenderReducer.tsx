const initialState = {
  genderData: null,
};

const GenderReducer = (state = initialState, action: any) => {
  // If action type is 'ADD_GENDER_DATA', update genderData in the state
  if (action.type === 'ADD_GENDER_DATA') {
    return {
      ...state,
      genderData: action.payload,
    };
  }

  return state;
};
export const GenderDataReducer = (state: {
  GenderReducer: {genderData: string};
}) => state.GenderReducer.genderData;
export default GenderReducer;
