import {act, renderHook} from '@testing-library/react-native';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useAdditems from 'screens/Additems/useAdditems';
import {addGenderData} from '../../../../src/redux/actions/actions';
import ApiService from 'network/network';
import {setSubcategoryData} from 'src/redux/slice/subcategorySlice';

jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('network/network');
jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    messaging: jest.fn(() => ({
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe('AddItems Screen', () => {
  const mockSubcategoryData = [
    {id: 1, subcategoryName: 'Subcategory 1'},
    {id: 2, subcategoryName: 'Subcategory 2'},
  ];
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    useSelector.mockImplementation(selector =>
      selector({
        category: {data: null},
        GenderReducer: {data: null},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the AddItems Screen', () => {
    const result = renderHook(() => useAdditems());
    expect(result).toBeDefined();
  });
  it('should change Gender when clicked ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleGenderChange('Men');
    });
    expect(result.current.gender).toBe('Men');
    expect(dispatchMock).toHaveBeenCalledWith(addGenderData('Men'));
  });
  it('should change Name when changed ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleNameChange('Shirt');
    });
    expect(result.current.name).toBe('Shirt');
  });
  it('should change Description when changed ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleDescriptionChange('New Shirt');
    });
    expect(result.current.description).toBe('New Shirt');
  });
  it('should change Outfit value when changed ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleOutfitChange('Pants');
    });
    expect(result.current.outfitType).toBe('Pants');
  });
  it('should change Event  value when changed ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleEventTypeChange('marraige');
    });
    expect(result.current.eventType).toBe('marraige');
  });
  it('should change Item Type  value when changed ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleItemTypeChange('Holiday');
    });
    expect(result.current.itemType).toBe('Holiday');
  });
  it('should handle the when test input is touched ', () => {
    const {result} = renderHook(() => useAdditems());
    act(() => {
      result.current.handleBlur('Holiday');
    });
    expect(result.current.formik.touched.Holiday).toBe(true);
  });
  it('should submit the data and Navigate to Add Images Screen ', () => {
    const {result} = renderHook(() => useAdditems());

    act(() => {
      result.current.handleItems();
    });
    expect(dispatchMock).toHaveBeenCalled();

    expect(mockNav).toHaveBeenCalledWith('OwnerImage');
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

    useSelector.mockImplementation(selector =>
      selector({
        category: {data: mockcategoryData},
        GenderReducer: {data: null},
      }),
    );
    act(() => {
      result.current.setCategoriesData(mockcategoryData);
    });
    expect(result.current.categoriesData).toStrictEqual(mockSubcategoryData);
  });
});
