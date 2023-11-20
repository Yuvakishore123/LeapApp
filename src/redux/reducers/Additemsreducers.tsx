import {
  ADD_GENDER,
  ADD_DESCRIPTION,
  ADD_EVENT,
  ADD_NAME,
  ADD_OUTFIT,
  ADD_TYPE,
} from '../actions/ActionTypes';

// Initial state for the ItemsReducer
const initialState = {
  CategoryId: null,
  Name: null,
  Description: null,
  subcategoryIds: null,
};

// Reducer function for handling item-related actions
export const ItemsReducer = (
  state = initialState, // Set the initial state to the default state defined above
  action: {type: any; payload: any}, // The action object contains a type and a payload
) => {
  switch (action.type) {
    case ADD_NAME:
      return {
        ...state, // Spread the current state to avoid mutation
        Name: action.payload, // Update the Name property with the payload value from the action
      };
    case ADD_DESCRIPTION:
      return {
        ...state,
        Description: action.payload,
      };
    case ADD_GENDER:
      return {
        ...state,
        CategoryId: action.payload,
      };
    case ADD_EVENT:
    case ADD_TYPE:
    case ADD_OUTFIT:
      return {
        ...state,
        subcategoryIds: action.payload,
      };
    default:
      return state;
  }
};
export const ItemreducerName = (state: {ItemsReducer: {Name: string}}) =>
  state.ItemsReducer.Name;
export const ItemreducerDescription = (state: {
  ItemsReducer: {Description: string};
}) => state.ItemsReducer.Description;
export const ItemreducerCategoryId = (state: {
  ItemsReducer: {CategoryId: []};
}) => state.ItemsReducer.CategoryId;
export const ItemReducerSubcategoryId = (state: {
  ItemsReducer: {subcategoryIds: []};
}) => state.ItemsReducer.subcategoryIds;
