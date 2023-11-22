const initialState = {
  selectedEvent: null,
  selectedOutfit: null,
};
//Reducer function for handling events and outfits in the application state.
export default function eventReducer(
  state = initialState,
  action: {type: any; payload: any},
) {
  switch (action.type) {
    // Case for selecting an event
    case 'SELECT_EVENT':
      return {
        ...state,
        selectedEvent: action.payload,
      };
    // Case for selecting an outfit
    case 'SELECT_OUTFIT':
      return {
        ...state,
        selectedOutfit: action.payload,
      };
    // Default case returns the current state if the action type is not recognized
    default:
      return state;
  }
}
