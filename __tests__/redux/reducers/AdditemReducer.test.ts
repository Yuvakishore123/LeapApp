import {
  ADD_NAME,
  ADD_DESCRIPTION,
  ADD_GENDER,
  ADD_EVENT,
  ADD_TYPE,
  ADD_OUTFIT,
} from '../../../src/redux/actions/actionTypes';
import {ItemsReducer} from '../../../src/redux/reducers/Additemsreducers';
describe('ItemsReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };
    const action = {type: 'UNKNOWN_ACTION', payload: null};

    const newState = ItemsReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });
  it('should handle ADD_NAME action', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };

    const action = {type: ADD_NAME, payload: 'Item Name'};

    const newState = ItemsReducer(initialState, action);

    expect(newState).toEqual({...initialState, Name: 'Item Name'});
  });

  it('should handle ADD_DESCRIPTION action', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };

    const action = {type: ADD_DESCRIPTION, payload: 'Item Description'};

    const newState = ItemsReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      Description: 'Item Description',
    });
  });

  it('should handle ADD_GENDER action', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };

    const action = {type: ADD_GENDER, payload: 'Gender ID'};

    const newState = ItemsReducer(initialState, action);

    expect(newState).toEqual({...initialState, CategoryId: 'Gender ID'});
  });

  it('should handle ADD_EVENT action', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };

    const action = {type: ADD_EVENT, payload: 'Event ID'};

    const newState = ItemsReducer(initialState, action);

    expect(newState).toEqual({...initialState, subcategoryIds: 'Event ID'});
  });

  it('should handle ADD_TYPE action', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };

    const action = {type: ADD_TYPE, payload: 'Type ID'};

    const newState = ItemsReducer(initialState, action);

    expect(newState).toEqual({...initialState, subcategoryIds: 'Type ID'});
  });

  it('should handle ADD_OUTFIT action', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };

    const action = {type: ADD_OUTFIT, payload: 'Outfit ID'};

    const newState = ItemsReducer(initialState, action);

    expect(newState).toEqual({...initialState, subcategoryIds: 'Outfit ID'});
  });

  it('should return the initial state for unknown action types', () => {
    const initialState = {
      CategoryId: null,
      Name: null,
      Description: null,
      subcategoryIds: null,
    };
    const action = {type: 'UNKNOWN_ACTION', payload: null};

    const newState = ItemsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
