import eventReducer from '../../../src/redux/reducers/EventReducer';

describe('eventReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      selectedEvent: null,
      selectedOutfit: null,
    };
    const action = {type: 'UNKNOWN_ACTION', payload: null};

    const newState = eventReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });
  it('should handle SELECT_EVENT action', () => {
    const initialState = {
      selectedEvent: null,
      selectedOutfit: null,
    };
    const action = {type: 'SELECT_EVENT', payload: 'Event 1'};

    const newState = eventReducer(initialState, action);

    expect(newState).toEqual({
      selectedEvent: 'Event 1',
      selectedOutfit: null,
    });
  });

  it('should handle SELECT_OUTFIT action', () => {
    const initialState = {
      selectedEvent: 'Event 1',
      selectedOutfit: null,
    };
    const action = {type: 'SELECT_OUTFIT', payload: 'Outfit 1'};

    const newState = eventReducer(initialState as any, action);

    expect(newState).toEqual({
      selectedEvent: 'Event 1',
      selectedOutfit: 'Outfit 1',
    });
  });

  it('should return the initial state for unknown action types', () => {
    const initialState = {
      selectedEvent: 'Event 1',
      selectedOutfit: 'Outfit 1',
    };
    const action = {type: 'UNKNOWN_ACTION', payload: null};

    const newState = eventReducer(initialState as any, action);

    expect(newState).toEqual(initialState);
  });
});
