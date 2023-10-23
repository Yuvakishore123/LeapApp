import {act, renderHook} from '@testing-library/react-native';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useAddImages from 'screens/OwnerImage/useAddImages';
import {ProductAdd} from '../../../../src/redux/slice/ProductAddSlice';
import AsyncStorageWrapper from '../../../../src/utils/asyncStorage';
import * as ImagePicker from 'react-native-image-picker';
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
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: (options, callback) => {
    // Simulate user selecting an image
    callback({
      didCancel: false,
      errorMessage: null,
      assets: [{uri: 'image1.jpg'}],
    });
  },
}));

jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockNav = jest.fn();
const mockGoback = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockGoback,
    }),
  };
});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe('AddItems Screen', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    useSelector.mockImplementation(selector =>
      selector({
        ItemsReducer: {
          name: {},
          Description: {},
          CategoryId: [],
          subcategoryIds: [],
        },
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the AddItems Screen', () => {
    const {result} = renderHook(() => useAddImages());
    expect(result).toBeDefined();
  });

  it('should change Size when changed ', () => {
    const {result} = renderHook(() => useAddImages());
    act(() => {
      result.current.handleSizeTypeChange('M');
    });
    expect(result.current.selectedsize).toBe('M');
  });
  it('should change Price when changed ', () => {
    const {result} = renderHook(() => useAddImages());
    act(() => {
      result.current.handlePriceChange('120');
    });
    expect(result.current.price).toBe('120');
  });
  it('should change Quantity value when changed ', () => {
    const {result} = renderHook(() => useAddImages());
    act(() => {
      result.current.handleQuantityChange('10');
    });
    expect(result.current.quantity).toBe('10');
  });
  it('should change Image  value when changed ', () => {
    const {result} = renderHook(() => useAddImages());
    act(() => {
      result.current.handleSelectedImage('Holiday');
    });
    expect(result.current.selectedImage).toBe('Holiday');
  });
  it('should handle the when test input is touched ', () => {
    const {result} = renderHook(() => useAddImages());
    act(() => {
      result.current.handleBlur('Holiday');
    });
    expect(result.current.formik.touched.Holiday).toBe(true);
  });
  it('should openModal ', () => {
    const {result} = renderHook(() => useAddImages());
    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModal).toBe(true);
  });
  it('should submit the data and Navigate to Add Images Screen ', () => {
    const {result} = renderHook(() => useAddImages());
    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
  });
  it('should  Navigate back', () => {
    const {result} = renderHook(() => useAddImages());

    act(() => {
      result.current.onHandleOwnerItems();
    });
    expect(mockGoback).toHaveBeenCalled();
  });
  it('should  Add The Item when post Data is clicked', () => {
    const Data = {
      brand: 'adiddas',
      categoryIds: [],
      color: 'black',
      name: 'name',
      description: 'description',
      id: 0,
      imageUrl: ['imageUrls'], // Use the imageUrls state
      material: 'fibre',
      price: 'price',
      totalQuantity: 'quantity',
      size: 'selectedsize',
      subcategoryIds: ['2', '3'],
    };

    const {result} = renderHook(() => useAddImages());

    act(() => {
      result.current.postData();
    });
    expect(dispatchMock).toHaveBeenCalled();
  });
  it('should remove the Images ', () => {
    const {result} = renderHook(() => useAddImages());
    expect(result.current.selectedImage).toBe('');

    act(() => {
      result.current.handleremove();
    });

    expect(result.current.selectedImage).toBe('');
  });
  it('should remove single Image while multiple images are added ', () => {
    const {result} = renderHook(() => useAddImages());
    act(() => {
      result.current.setImageUrls(['image1.jpg', 'image2.jpg', 'image3.jpg']);
    });
    expect(result.current.imageUrls).toEqual([
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
    ]);

    act(() => {
      result.current.handleRemoveImage(1);
    });
    expect(result.current.imageUrls).toEqual(['image1.jpg', 'image3.jpg']);

    expect(result.current.selectedImage).toBe('');
  });
  it('should get Image when single Image while multiple images are added ', () => {
    const {result} = renderHook(() => useAddImages());
    act(() => {
      result.current.setImageUrls(['image1.jpg', 'image2.jpg', 'image3.jpg']);
    });
    expect(result.current.imageUrls).toEqual([
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
    ]);

    act(() => {
      result.current.handleRemoveImage(1);
    });
    expect(result.current.imageUrls).toEqual(['image1.jpg', 'image3.jpg']);

    expect(result.current.selectedImage).toBe('');
  });
  it('should post the image and get the response  ', () => {
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockedToken');

    const mockResponse = {urls: ['new-image.jpg']};
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });

    // Store the initial imageUrls

    const {result} = renderHook(() => useAddImages());
    const initialImageUrls = result.current.imageUrls;
    act(() => {
      result.current.setImageUrls(['image1.jpg', 'image2.jpg', 'image3.jpg']);
    });

    expect(result.current.imageUrls).toEqual([
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
    ]);

    act(() => {
      result.current.pickImages();
    });

    // Verify that imageUrls have been updated
    expect(result.current.imageUrls).not.toEqual(initialImageUrls);
  });
  it('should cancel to be called  ', () => {
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockedToken');

    const mockResponse = {urls: ['new-image.jpg']};
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });

    // Store the initial imageUrls

    const {result} = renderHook(() => useAddImages());
    const initialImageUrls = result.current.imageUrls;
    act(() => {
      result.current.setImageUrls(['image1.jpg', 'image2.jpg', 'image3.jpg']);
    });

    expect(result.current.imageUrls).toEqual([
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
    ]);

    act(() => {
      result.current.pickImages();
    });

    // Verify that imageUrls have been updated
    expect(result.current.imageUrls).not.toEqual(initialImageUrls);
  });
});
