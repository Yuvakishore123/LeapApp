import {SetStateAction} from 'react';
import {
  ADD_DESCRIPTION,
  ADD_EVENT,
  ADD_GENDER,
  ADD_NAME,
  ADD_SIZE,
  ADD_TYPE,
} from '../types';
export const addname = (Name: any) => ({
  type: ADD_NAME,
  payload: Name,
});
export const addtype = (subcategoryIds: any) => ({
  type: ADD_TYPE,
  payload: subcategoryIds,
});
export const addoutfit = (subcategoryIds: any) => ({
  type: ADD_TYPE,
  payload: subcategoryIds,
});
export const addItemsData = (Description: any) => ({
  type: ADD_DESCRIPTION,
  payload: Description,
});
export const addGender = (CategoryId: any) => ({
  type: ADD_GENDER,
  payload: CategoryId,
});
export const addevent = (subcategoryIds: any) => ({
  type: ADD_EVENT,
  payload: subcategoryIds,
});
export const addsize = (selected: any) => ({
  type: ADD_SIZE,
  payload: selected,
});

export const addGenderData = (genderData: SetStateAction<string>) => {
  return {
    type: 'ADD_GENDER_DATA',
    payload: genderData,
  };
};
