import {
  ADD_NAME,
  ADD_DESCRIPTION,
  ADD_GENDER,
  ADD_EVENT,
  ADD_TYPE,
  ADD_OUTFIT,
} from '../types';

// Initial state for the ItemsReducer
const initialState = {
  CategoryId: null,
  Name: null,
  Description: null,
  subcategoryIds: null,
};

// Reducer function for the ItemsReducer
export const ItemsReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case ADD_NAME:
      return {
        ...state,
        Name: action.payload,
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

// Selector to get the 'Name' from the ItemsReducer state
export const selectItemsData = (state: {ItemsReducer: {Name: string}}) =>
  state.ItemsReducer.Name;

// Selector to get the 'Description' from the ItemsReducer state
export const selectItemsDataDescription = (state: {
  ItemsReducer: {Description: string};
}) => state.ItemsReducer.Description;

// Selector to get the 'subcategoryIds' from the ItemsReducer state
export const selectItemsDataSubcategory = (state: {
  ItemsReducer: {subcategoryIds: []};
}) => state.ItemsReducer.subcategoryIds;

// Selector to get the 'subcategoryIds' from the ItemsReducer state
export const selectItemsDataCategories = (state: {
  ItemsReducer: {subcategoryIds: []};
}) => state.ItemsReducer.subcategoryIds;
