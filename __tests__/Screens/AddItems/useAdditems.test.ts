import {act, renderHook} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import React from 'react';
import useAdditems from '../../../src/screens/Additems/useAdditems';
import {
  addGender,
  addItemsData,
  addevent,
  addname,
  addtype,
} from '../../../src/redux/actions/actions';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => mockDispatch),
}));

// jest.mock('../../../src/helpers/helper', () => ({
//   useThunkDispatch: () => ({dispatch: mockDispatch}),
// }));
// jest.mock('react-test-renderer', () => ({
//   act: jest.fn(),
// }));
const mockNav = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
    }),
  };
});
describe('useAdditems', () => {
  beforeEach(() => {
    useSelector.mockImplementation(
      (
        selector: (arg0: {
          category: {data: {}};
          GenderReducer: {genderData: null};
        }) => any,
      ) =>
        selector({
          category: {data: {}},
          GenderReducer: {genderData: null},
        }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('handles useEffect hook correctly', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    renderHook(() => useAdditems());

    // Expect that the useEffect hook was called
    expect(useEffectSpy).toHaveBeenCalled();

    // Expect that the useEffect hook was called with a function
    expect(useEffectSpy.mock.calls[0][0]).toBeInstanceOf(Function);
  });
  it('should dispatch the correct actions and navigate to OwnerImage', () => {
    const {result} = renderHook(() => useAdditems());

    act(() => {
      // Mocking the values needed for handleItems
      result.current.gender = 'someGender';
      result.current.itemType = 'someItemType';
      result.current.eventType = 'someEventType';
      result.current.outfitType = 'someOutfitType';
      result.current.name = 'someName';
      result.current.description = 'someDescription';

      result.current.handleItems();
    });

    // Asserting that the correct actions were dispatched
    expect(mockDispatch).toHaveBeenCalledWith(addname('someName'));
    expect(mockDispatch).toHaveBeenCalledWith(
      addtype(['someItemType', 'someEventType', 'someOutfitType']),
    );
    expect(mockDispatch).toHaveBeenCalledWith(addItemsData('someDescription'));
    expect(mockDispatch).toHaveBeenCalledWith(addGender(['someGender']));
    expect(mockDispatch).toHaveBeenCalledWith(
      addevent(['someItemType', 'someEventType', 'someOutfitType']),
    );

    // Asserting that navigation.navigate was called with the correct argument
    expect(mockNav).toHaveBeenCalledWith('OwnerImage');
  });
});
