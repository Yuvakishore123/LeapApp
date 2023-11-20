import {act, renderHook, waitFor} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import useAdditems from '../../../src/screens/Additems/useAdditems';
import ApiService from 'network/Network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/network/Network', () => ({
  get: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => mockDispatch),
}));
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
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (
        selector: (arg0: {
          category: {data: null};
          GenderReducer: {genderData: null};
        }) => any,
      ) =>
        selector({
          category: {data: null},
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
      result.current.handleItems();
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNav).toHaveBeenCalledWith('AddImages');
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
    expect(result.current.name).toBe('john');
  });
  it('should set description state correctly', () => {
    const {result} = renderHook(() => useAdditems()); // Render the hook

    act(() => {
      result.current.handleDescriptionChange('Product mock description');
    });
    expect(result.current.description).toBe('Product mock description');
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

    act(() => {
      result.current.handleGenderChange('Men');
    });
    waitFor(() => {
      expect(result.current.gender).toBe('Men');
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
  it('should fetch subcategory data correctly', async () => {
    const mockResponse = [
      {id: 1, subcategoryName: 'Category A'},
      {id: 2, subcategoryName: 'Category B'},
    ]; // Mocked response data
    const {result} = renderHook(() => useAdditems());

    (ApiService.get as jest.Mock).mockResolvedValue(mockResponse);
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));

    result.current.fetchSubCategoryData();
    await asyncOperation();
    expect(result.current.subCategoriesData).toEqual([
      {value: 1, label: 'Category A'},
      {value: 2, label: 'Category B'},
    ]);
  });
  it('should Reject fetch subcategory data correctly', async () => {
    const mockResponse = {message: 'Fetch Data Failed', status: 'FAILURE'};
    const {result} = renderHook(() => useAdditems());

    (ApiService.get as jest.Mock).mockRejectedValue(mockResponse);
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));
    act(() => {
      result.current.fetchSubCategoryData();
    });
    await asyncOperation();

    expect(result.current.isLoading).toBe(true);
  });
  it('should fetch the categories data', () => {
    const mockcategoryData = [
      {id: 1, subcategoryName: 'Subcategory 1'},
      {id: 2, subcategoryName: 'Subcategory 2'},
    ];

    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.setCategoriesData([]);
    });
    act(() => {
      result.current.fetchSubCategoryData();
    });

    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        category: {data: mockcategoryData},
        GenderReducer: {data: null},
      }),
    );
    act(() => {
      result.current.setCategoriesData(mockcategoryData as any);
    });
    expect(result.current.categoriesData).toStrictEqual(mockcategoryData);
  });
  it('should handle the when test input is touched ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleBlur('Holiday');
    });
    expect(result.current.formik.touched.Holiday).toBe(true);
  });
});
