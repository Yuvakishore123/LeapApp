const initialState = {
  selectedEvent: null, // Keeps track of the selected event
  selectedOutfit: null, // Keeps track of the selected outfit
};
export default function eventReducer(
  state = initialState,
  action: {type: any; payload: any},
) {
  switch (action.type) {
    // case for selecting events
    case 'SELECT_EVENT':
      return {
        ...state,
        selectedEvent: action.payload,
      };
    // case for selecting outfit
    case 'SELECT_OUTFIT':
      return {
        ...state,
        selectedOutfit: action.payload,
      };
    default:
      return state;
  }
}
