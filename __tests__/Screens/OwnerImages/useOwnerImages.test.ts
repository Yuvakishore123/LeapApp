import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import useAddImages from '../../../src/screens/OwnerImage/useAddImages';
import {ProductAdd} from '../../../src/redux/slice/ProductAddSlice';
import {addsize} from '../../../src/redux/actions/actions';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});
let PermissionsAndroidMock = {
  request: jest.fn(),
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
  },
};
const configureDispatch = () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  return dispatch;
};
describe('Checkout Screen', () => {
  const mockDispatch = configureDispatch();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation(
      (
        selector: (arg0: {
          ItemsReducer: {
            Name: '';
            Description: '';
            CategoryId: [];
            subcategoryIds: [];
          };
        }) => any,
      ) =>
        selector({
          ItemsReducer: {
            Name: '',
            Description: '',
            CategoryId: [],
            subcategoryIds: [],
          },
        }),
    );
    AsyncStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('This should open modal', () => {
    const wishlist = renderHook(() => useAddImages());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useAddImages());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    expect(mockNav).toBeCalledWith('Home', {screen: 'OwnerHome'});
    expect(result.current.showModal).toBe(false);
  });
  it('should set Size Type state correctly', () => {
    const {result} = renderHook(() => useAddImages()); // Render the hook

    act(() => {
      result.current.handleSizeTypeChange('XXL');
    });
    waitFor(() => {
      expect(result.current.selectedsize).toBe('XXL');
    });
  });
  it('should set PriceChange state correctly', () => {
    const {result} = renderHook(() => useAddImages()); // Render the hook

    act(() => {
      result.current.handlePriceChange('1285');
    });
    waitFor(() => {
      expect(result.current.setPrice).toBe('1285');
    });
  });
  it('should set selectedImage state correctly', () => {
    const {result} = renderHook(() => useAddImages()); // Render the hook

    act(() => {
      result.current.handleSelectedImage('sampleImage1.png');
    });
    waitFor(() => {
      expect(result.current.selectedImage).toBe('sampleImage1.png');
    });
  });
  it('should set handleQuantity state correctly', () => {
    const {result} = renderHook(() => useAddImages()); // Render the hook

    act(() => {
      result.current.handleQuantityChange('5');
    });
    waitFor(() => {
      expect(result.current.setQuantity).toBe('5');
    });
  });
  it('should dispatch the correct actions and call openModal', async () => {
    const {result} = renderHook(() => useAddImages());

    // Call the function
    const mockData = {
      brand: 'adiddas',
      categoryIds: ['mockCategoryId'],
      color: 'black',
      name: 'mockName',
      description: 'mockDescription',
      id: 0,
      imageUrl: ['mockImageUrl'], // Use the imageUrls state
      material: 'fibre',
      price: 'mockPrice',
      totalQuantity: 'mockQuantity',
      size: 'mockSize',
      subcategoryIds: ['mockSubcategoryId'],
    };
    act(() => {
      result.current.postData();
    });
    waitFor(() => {
      // Check if dispatch was called correctly
      expect(mockDispatch).toHaveBeenCalledWith(ProductAdd(mockData));
      expect(mockDispatch).toHaveBeenCalledWith(addsize('mockSize'));
      expect(result.current.openModal).toHaveBeenCalled();
    });
  });
  it('should handle permission already granted', async () => {
    const {result} = renderHook(() => useAddImages());

    asyncStorageWrapper.getItem.mockResolvedValue('true');
    act(async () => {
      await result.current.checkPermission();
    });

    expect(asyncStorageWrapper.getItem).toHaveBeenCalledWith(
      'permissionGranted',
    );
    expect(PermissionsAndroidMock.request).not.toHaveBeenCalled();
  });
});
