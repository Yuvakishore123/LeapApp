const initialState = {
  genderData: null,
};
//Reducer function for handling gender data in the application state.
const GenderReducer = (state = initialState, action: any) => {
  if (action.type === 'ADD_GENDER_DATA') {
    // Case for adding gender data to the state
    return {
      ...state,
      genderData: action.payload,
    };
  }
  // Default case returns the current state if the action type is not recognized

  return state;
};
//Selector function to retrieve gender data from the gender reducer state.
export const selectGenderData = (state: {
  GenderReducer: {genderData: string};
}) => state.GenderReducer.genderData;

export default GenderReducer;
