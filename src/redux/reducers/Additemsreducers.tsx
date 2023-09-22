import {
  ADD_GENDER,
  ADD_DESCRIPTION,
  ADD_EVENT,
  ADD_NAME,
  ADD_OUTFIT,
  ADD_TYPE,
} from '../actions/actionTypes';
const initialState = {
  CategoryId: null,
  Name: null,
  Description: null,
  subcategoryIds: null,
};
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
