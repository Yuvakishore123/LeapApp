import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import useAddImages from '../../../src/screens/OwnerImage/useAddImages';
import {ProductAdd} from '../../../src/redux/slice/ProductAddSlice';
import {addsize} from '../../../src/redux/actions/Actions';
import asyncStorageWrapper from 'constants/AsyncStorageWrapper';
import {launchImageLibrary} from 'react-native-image-picker';
import {logMessage} from 'helpers/Helper';
import {PermissionsAndroid} from 'react-native';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockNav = jest.fn();
const mockgoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockgoBack,
      addListener: jest.fn(),
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});
const mockRequest = jest.fn();
jest.mock(
  'react-native/Libraries/PermissionsAndroid/PermissionsAndroid',
  () => ({
    request: mockRequest,
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
    PERMISSIONS: {
      WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
      // Add any other permissions you might use
    },
  }),
);
describe('useAddimages', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
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
    expect(result.current.selectedsize).toBe('XXL');
  });
  it('should set PriceChange state correctly', () => {
    const {result} = renderHook(() => useAddImages()); // Render the hook

    act(() => {
      result.current.handlePriceChange('1285');
    });
    expect(result.current.price).toBe('1285');
  });
  it('should set selectedImage state correctly', () => {
    const {result} = renderHook(() => useAddImages()); // Render the hook

    act(() => {
      result.current.handleSelectedImage('sampleImage1.png');
    });
    expect(result.current.selectedImage).toBe('sampleImage1.png');
  });
  it('should set handleQuantity state correctly', () => {
    const {result} = renderHook(() => useAddImages()); // Render the hook

    act(() => {
      result.current.handleQuantityChange('5');
    });
    expect(result.current.quantity).toBe('5');
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

    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('true');
    act(async () => {
      await result.current.checkPermission();
    });

    expect(asyncStorageWrapper.getItem).toHaveBeenCalledWith(
      'permissionGranted',
    );
    expect(PermissionsAndroid.request).not.toHaveBeenCalled();
  });
  it('should handle permission denial', async () => {
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(null);
    (mockRequest as jest.Mock).mockImplementation(() =>
      Promise.resolve('denied'),
    );

    const {result} = renderHook(() => useAddImages());

    await act(async () => {
      await result.current.checkPermission();
    });

    expect(mockRequest).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        buttonPositive: 'OK',
        message: 'App needs access to your storage to upload images.',
        title: 'Storage Permission',
      },
    );
  });
  it('should call pickImages when permission is granted', async () => {
    const {result} = renderHook(() => useAddImages());

    // Mock PermissionsAndroid.request to return GRANTED
    (PermissionsAndroid.request as jest.Mock).mockResolvedValue('granted');

    await result.current.checkPermission();

    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to upload images.',
        buttonPositive: 'OK',
      },
    );

    // expect(logMessage.error).toHaveBeenCalledWith('Storage permission granted');
    expect(asyncStorageWrapper.setItem).toHaveBeenCalledWith(
      'permissionGranted',
      'true',
    );
    waitFor(() => {
      expect(result.current.pickImages).toBeCalled();
    });
  });

  it('should call formik.setFieldTouched correctly when handleBlur is called', () => {
    const mockBlur = jest.fn();
    const {result} = renderHook(() => useAddImages());
    const fieldToBlur = 'name';
    act(() => {
      result.current.handleBlur(fieldToBlur);
    });
    waitFor(() => {
      expect(mockBlur).toBeCalled();
    });
  });
  it('onHandleOwnerItems should call navigation.goBack', () => {
    const {result} = renderHook(() => useAddImages());

    act(() => {
      result.current.onHandleOwnerItems();
    });
    expect(mockgoBack).toHaveBeenCalled();
  });
  it('should call pickImages if permission is granted', async () => {
    const {result} = renderHook(() => useAddImages());

    // Mock permission as granted
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('true');

    await result.current.checkPermission();
    waitFor(() => {
      expect(result.current.pickImages).toHaveBeenCalled();
    });
  });
  it('should call handleremove', async () => {
    const {result} = renderHook(() => useAddImages());

    act(() => {
      result.current.handleremove();
    });
    waitFor(() => {
      expect(result.current.selectedImage).toBe('');
    });
  });
  it('should call handleRemoveImages', async () => {
    const {result} = renderHook(() => useAddImages());
    const mockId = 0;
    act(() => {
      result.current.setImageUrls(['image.png', 'image2.png']);
    });
    expect(result.current.imageUrls).toEqual(['image.png', 'image2.png']);
    act(() => {
      result.current.handleRemoveImage(mockId);
    });
    expect(result.current.imageUrls).toEqual(['image2.png']);
    expect(result.current.isLoading).toBe(false);
  });
  it('should upload images and set image URLs', async () => {
    // Mock token and image response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({urls: ['mockImageUrl']}),
    });
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const imageResponse = {
      didCancel: false,
      assets: [{uri: 'image1.jpg'}, {uri: 'image2.jpg'}],
    };

    // Mock launchImageLibrary to call the callback function directly
    (launchImageLibrary as jest.Mock).mockImplementation(
      (options, callback) => {
        callback(imageResponse);
      },
    );

    // Render your hook (replace useYourHook with your actual hook)
    const {result} = renderHook(() => useAddImages());

    // Call the pickImages function
    await act(async () => {
      await result.current.pickImages();
    });

    // Assertions

    // Verify that AsyncStorage.getItem was called with 'token'
    expect(asyncStorageWrapper.getItem).toHaveBeenCalledWith('token');

    // Verify that launchImageLibrary was called with the correct options
    expect(launchImageLibrary).toBeCalled();

    expect(result.current.imageUrls).toEqual(['mockImageUrl']);
  });
  it('should reject didCancel is true upload images and set image URLs', async () => {
    jest.mock('../../../src/helpers/helper', () => ({
      logMessage: {
        error: jest.fn(),
        info: jest.fn(),
      },
    }));
    // Mock token and image response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({urls: ['mockImageUrl']}),
    });
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const imageResponse = {
      didCancel: true,
      assets: [{uri: 'image1.jpg'}, {uri: 'image2.jpg'}],
    };
    (launchImageLibrary as jest.Mock).mockImplementation(
      (options, callback) => {
        callback(imageResponse);
      },
    );

    // Render your hook (replace useYourHook with your actual hook)
    const {result} = renderHook(() => useAddImages());

    // Call the pickImg function
    await act(async () => {
      await result.current.pickImages();
    });
    waitFor(() => {
      expect(logMessage.error).toBe('User cancelled image picker');
    });
  });
  it('should reject when error message when upload images and set image URLs', async () => {
    jest.mock('../../../src/helpers/helper', () => ({
      logMessage: {
        error: jest.fn(),
        info: jest.fn(),
      },
    }));
    // Mock token and image response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({urls: ['mockImageUrl']}),
    });
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const imageResponse = {
      didCancel: false,
      errorMessage: 'upload failed',
      assets: [{uri: 'image1.jpg'}, {uri: 'image2.jpg'}],
    };
    (launchImageLibrary as jest.Mock).mockImplementation(
      (options, callback) => {
        callback(imageResponse);
      },
    );

    // Render your hook (replace useYourHook with your actual hook)
    const {result} = renderHook(() => useAddImages());

    // Call the pickImg function
    await act(async () => {
      await result.current.pickImages();
    });
    waitFor(() => {
      expect(logMessage.error).toBe('upload failed');
    });
  });
  it('should reject  upload images and set image URLs', async () => {
    // Mock token and image response
    jest.mock('../../../src/helpers/helper', () => ({
      logMessage: {
        error: jest.fn(),
        info: jest.fn(),
      },
    }));
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({urls: ['mockImageUrl']}),
    });
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const imageResponse = {
      didCancel: false,
      assets: [{uri: 'image1.jpg'}, {uri: 'image2.jpg'}],
    };
    (launchImageLibrary as jest.Mock).mockImplementation(
      (options, callback) => {
        callback(imageResponse);
      },
    );

    // Render your hook (replace useYourHook with your actual hook)
    const {result} = renderHook(() => useAddImages());

    // Call the pickImg function
    await act(async () => {
      await result.current.pickImages();
    });
    waitFor(() => {
      expect(logMessage.error).toBe('Upload failed');
    });
  });
  it('should reject  response of launchImageLibrary', async () => {
    jest.mock('../../../src/helpers/helper', () => ({
      logMessage: {
        error: jest.fn(),
        info: jest.fn(),
      },
    }));
    // Mock token and image response
    global.fetch = jest.fn().mockRejectedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({urls: ['mockImageUrl']}),
    });
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const imageResponse = {
      didCancel: false,
      assets: [{uri: 'image1.jpg'}, {uri: 'image2.jpg'}],
    };
    (launchImageLibrary as jest.Mock).mockImplementation(
      (options, callback) => {
        callback(imageResponse);
      },
    );

    // Render your hook (replace useYourHook with your actual hook)
    const {result} = renderHook(() => useAddImages());

    // Call the pickImg function
    await act(async () => {
      await result.current.pickImages();
    });
    waitFor(() => {
      expect(logMessage.error).toBe('Upload failed');
    });
  });
});
