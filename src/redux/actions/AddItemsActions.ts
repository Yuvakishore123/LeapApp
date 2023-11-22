import {SetStateAction} from 'react';
import {
  ADD_DESCRIPTION,
  ADD_EVENT,
  ADD_GENDER,
  ADD_NAME,
  ADD_SIZE,
  ADD_TYPE,
} from '../types';
// Action creator for adding a name to the Redux store
export const addname = (Name: any) => ({
  // Action type indicating the action to add a name
  type: ADD_NAME,
  // Payload containing the name data
  payload: Name,
});

// Action creator for adding a type to the Redux store
export const addtype = (subcategoryIds: any) => ({
  // Action type indicating the action to add a type
  type: ADD_TYPE,
  // Payload containing the type data
  payload: subcategoryIds,
});

// Action creator for adding an outfit to the Redux store
export const addoutfit = (subcategoryIds: any) => ({
  type: ADD_TYPE,
  payload: subcategoryIds,
});

// Action creator for adding description to the Redux store
export const addItemsData = (Description: any) => ({
  // Action type indicating the action to add a description
  type: ADD_DESCRIPTION,
  // Payload containing the description data
  payload: Description,
});

// Action creator for adding gender to the Redux store
export const addGender = (CategoryId: any) => ({
  // Action type indicating the action to add a gender
  type: ADD_GENDER,
  // Payload containing the gender data
  payload: CategoryId,
});

// Action creator for adding an event to the Redux store
export const addevent = (subcategoryIds: any) => ({
  // Action type indicating the action to add an event
  type: ADD_EVENT,
  // Payload containing the event data
  payload: subcategoryIds,
});

// Action creator for adding size to the Redux store
export const addsize = (selected: any) => ({
  // Action type indicating the action to add a size
  type: ADD_SIZE,
  // Payload containing the size data
  payload: selected,
});

// Action creator for adding gender data to the Redux store
export const addGenderData = (genderData: SetStateAction<string>) => {
  return {
    // Action type indicating the action to add gender data
    type: 'ADD_GENDER_DATA',
    // Payload containing the gender data
    payload: genderData,
  };
};
