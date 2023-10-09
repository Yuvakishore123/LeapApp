import {act, renderHook, waitFor} from '@testing-library/react-native';
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
import ApiService from 'network/network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
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
    waitFor(() => {
      expect(result.current.gender).toBe('someGender');
      expect(result.current.itemType).toBe('someItemType');
      expect(result.current.eventType).toBe('someEventType');
      expect(result.current.outfitType).toBe('someOutfitType');
      expect(result.current.name).toBe('someName');
      expect(result.current.description).toBe('someDescription');
    });
    act(() => {
      result.current.handleItems();
    });

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addname('someName'));
      expect(mockDispatch).toHaveBeenCalledWith(
        addtype(['someItemType', 'someEventType', 'someOutfitType']),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        addItemsData('someDescription'),
      );
      expect(mockDispatch).toHaveBeenCalledWith(addGender(['someGender']));
      expect(mockDispatch).toHaveBeenCalledWith(
        addevent(['someItemType', 'someEventType', 'someOutfitType']),
      );
      expect(mockNav).toHaveBeenCalledWith('OwnerImage');
    });
  });
  it('should update itemType state correctly', () => {
    const {result} = renderHook(() => useAdditems()); // Render the hook

    expect(result.current.itemType).toBe('');

    act(() => {
      result.current.handleItemTypeChange('someItemType');
    });

    expect(result.current.itemType).toBe('someItemType');
  });
  it('should update eventType state correctly', () => {
    const {result} = renderHook(() => useAdditems()); // Render the hook

    // Initially, eventType should be an empty string (or any initial value you set)
    expect(result.current.eventType).toBe('');

    // Call handleEventTypeChange function with a selectedEventType
    act(() => {
      result.current.handleEventTypeChange('someEventType');
    });

    // After calling handleEventTypeChange, eventType should be 'someEventType'
    expect(result.current.eventType).toBe('someEventType');
  });
  it('should set name state correctly', () => {
    const {result} = renderHook(() => useAdditems()); // Render the hook

    act(() => {
      result.current.handleNameChange('john');
    });
    waitFor(() => {
      expect(result.current.name).toBe('john');
    });
  });
  it('should set description state correctly', () => {
    const {result} = renderHook(() => useAdditems()); // Render the hook

    act(() => {
      result.current.handleDescriptionChange('Product mock description');
    });
    waitFor(() => {
      expect(result.current.description).toBe('Product mock description');
    });
  });
  it('should set Outfit Type state correctly', () => {
    const {result} = renderHook(() => useAdditems()); // Render the hook

    act(() => {
      result.current.handleOutfitChange('someOutfitType');
    });
    waitFor(() => {
      expect(result.current.outfitType).toBe('someOutfitType');
    });
  });
  it('should set Gender Type state correctly', () => {
    const {result} = renderHook(() => useAdditems()); // Render the hook
    waitFor(() => {
      expect(result.current.gender).toBe('Men');
    });

    act(() => {
      result.current.handleGenderChange('Men');
    });
    waitFor(() => {
      expect(result.current.gender).toBe('Men');
      expect(mockDispatch).toBe(addGender('Men'));
    });
  });
  it('should fetch subcategory data correctly', async () => {
    const mockResponse = [
      {id: 1, subcategoryName: 'Category A'},
      {id: 2, subcategoryName: 'Category B'},
    ]; // Mocked response data
    const {result} = renderHook(() => useAdditems());

    ApiService.get.mockResolvedValue(mockResponse);

    result.current.fetchSubCategoryData();
    waitFor(() => {
      expect(result.current.subCategoriesData).toHaveBeenCalledWith([
        {value: 1, label: 'Category A'},
        {value: 2, label: 'Category B'},
      ]);
    });
  });
  it('should Reject fetch subcategory data correctly', async () => {
    const mockResponse = {message: 'Fetch Data Failed', status: 'SUCCESS'};
    const {result} = renderHook(() => useAdditems());

    ApiService.get.mockResolvedValue(mockResponse);

    result.current.fetchSubCategoryData();
    waitFor(() => {
      expect(result.current.isLoading).toHaveBeenCalledWith(true);
    });
  });
});
