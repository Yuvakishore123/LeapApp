import GenderReducer from '../../../src/redux/reducers/GenderReducer';

describe('GenderReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      genderData: null,
    };

    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 'data',
    };

    const newState = GenderReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should handle ADD_GENDER_DATA action', () => {
    const initialState = {
      genderData: null,
    };

    const action = {
      type: 'ADD_GENDER_DATA',
      payload: 'male',
    };

    const expectedState = {
      genderData: 'male',
    };

    const newState = GenderReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
