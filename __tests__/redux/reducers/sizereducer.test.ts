import SizeReducer from '../../../src/redux/reducers/sizeReducer';
type SizeAction = {
  type: string;
  payload: string;
};
const initialState = {
  selected: '',
};
describe('SizeReducer', () => {
  it('should return the initial state', () => {
    expect(SizeReducer(undefined, {} as SizeAction)).toEqual(initialState);
  });

  it('should handle ADD_SIZE', () => {
    const action = {
      type: 'ADD_SIZE',
      payload: 'small',
    };

    const expectedState = {
      selected: 'small',
    };

    expect(SizeReducer(undefined, action)).toEqual(expectedState);
  });

  it('should not modify the state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 'large',
    };

    expect(SizeReducer(undefined, action)).toEqual(initialState);
  });
});
