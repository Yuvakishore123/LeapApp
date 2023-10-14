import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Useowneredititems from 'screens/Owneredititems/Useowneredititems';
import {
  addGenderData,
  addsize,
  removeproducts,
} from '../../../src/redux/actions/actions';
import {useDispatch} from 'react-redux';
import ApiService from 'network/network';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import {launchImageLibrary} from 'react-native-image-picker';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
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
jest.mock('../../../src/helpers/helper', () => ({
  logMessage: {
    error: jest.fn(),
    info: jest.fn(),
  },
}));
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
  put: jest.fn(),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
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
describe('useCart', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => Useowneredititems());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('should update gender state and dispatch action', () => {
    const dispatch = jest.fn();
    const selectedGender = 'Male';

    // Mock the useDispatch hook to return the dispatch function
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    // Render the hook
    const {result} = renderHook(() => Useowneredititems());

    // Call the handleGenderChange function
    act(() => {
      result.current.handleGenderChange(selectedGender);
    });

    waitFor(() => {
      expect(result.current.gender).toBe(selectedGender);
    });

    // Check if dispatch was called with the correct action (addGenderData)
    expect(dispatch).toHaveBeenCalledWith(addGenderData(selectedGender));
  });
  it('should fetch data and set state on successful API response', async () => {
    const mockResponse = [
      {
        id: 1,
        name: 'Item 1',
        price: 10,
        imageUrl: ['image_url_1'],
        disabledQuantities: [],
        availableQuantities: [1, 2, 3],
        disabled: false,
        totalQuantity: 5,
      },
    ];
    const {result} = renderHook(() => Useowneredititems());

    // Mock the ApiService.get function to return a resolved Promise with mockResponse
    (ApiService.get as jest.Mock).mockResolvedValue(mockResponse);

    // Call the fetchData function
    await result.current.fetchData();

    waitFor(() => {
      expect(result.current.data).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          image: 'image_url_1',
          disabledQuantities: [],
          availableQuantities: [1, 2, 3],
          disabled: false,
          totalQuantity: 5,
        },
      ]);
      expect(result.current.isLoading).toHaveBeenCalledWith(false);
    });

    // Check if setIsLoading was called with false
  });
  it('should handle FetchData ', async () => {
    const mockId = 2;
    const mockResponse = [
      {
        id: 1,
        name: 'Item 1',
        price: 10,
        description: 'Item 1 description',
        totalQuantity: 5,
      },
    ];
    const {result} = renderHook(() => Useowneredititems());

    // Mock the ApiService.get function to return a resolved Promise with mockResponse
    (ApiService.get as jest.Mock).mockResolvedValue(mockResponse);

    // Call the fetchData function
    await result.current.FetchData(mockId);

    waitFor(() => {
      expect(result.current.Mapdata).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          description: 'Item 1 description',
          totalQuantity: 5,
        },
      ]);
    });

    // Check if setIsLoading was called with false
  });
  it('should update refreshData state correctly', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook

    // Initially, refreshData should be true (or any initial value you set)
    waitFor(() => {
      expect(result.current.refreshData).toBe(true);
    });

    // Call handleRefresh function
    act(() => {
      result.current.handleRefresh();
    });

    // After calling handleRefresh, refreshData should be false
    expect(result.current.refreshData).toBe(false);
  });
  it('should update eventType state correctly', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook

    // Initially, eventType should be an empty string (or any initial value you set)
    expect(result.current.eventType).toBe('');

    // Call handleEventTypeChange function with a selectedEventType
    act(() => {
      result.current.handleEventTypeChange('someEventType');
    });

    // After calling handleEventTypeChange, eventType should be 'someEventType'
    expect(result.current.eventType).toBe('someEventType');
  });
  it('should update outfitType state correctly', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook

    expect(result.current.outfitType).toBe('');

    act(() => {
      result.current.handleOutfitChange('someOutfitType');
    });
    expect(result.current.outfitType).toBe('someOutfitType');
  });
  it('should update itemType state correctly', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook

    expect(result.current.itemType).toBe('');

    act(() => {
      result.current.handleItemTypeChange('someItemType');
    });

    expect(result.current.itemType).toBe('someItemType');
  });
  it('should update selectedSize state correctly', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook

    expect(result.current.selectedsize).toBe('');

    act(() => {
      result.current.handleSizeTypeChange('someSize');
    });

    expect(result.current.selectedsize).toBe('someSize');
  });
  it('should update state variables correctly on handleDisableProduct', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook

    expect(result.current.isModalVisible).toBe(false);
    expect(result.current.productQuantity).toBe(0);
    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.selectedProductId).toBe(null);
    expect(result.current.disabledQuantity).toBe(0);

    // Call handleDisableProduct function with a sample item
    act(() => {
      result.current.handleDisableProduct({
        availableQuantities: 5,
        totalQuantity: 10,
        id: 1,
        disabledQuantities: 3,
      });
    });
    waitFor(() => {
      expect(result.current.isModalVisible).toBe(true);
      expect(result.current.productQuantity).toBe(5);
      expect(result.current.totalQuantity).toBe(10);
      expect(result.current.selectedProductId).toBe(1);
      expect(result.current.disabledQuantity).toBe(3);
    });
  });
  it('should update updatedQuantity correctly on decrementQuantity', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook
    expect(result.current.updatedQuantity).toBe(0);

    // Simulate setting up product quantity and disabled quantity
    act(() => {
      result.current.setupdatedquantity(5);
    });
    act(() => {
      result.current.decrementQuantity();
    });
    waitFor(() => {
      expect(result.current.updatedQuantity).toBe(4);
    });
  });
  it('should handle disabling button correctly', async () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook
    waitFor(() => {
      expect(result.current.productQuantity).toBe(10);
      expect(result.current.totalQuantity).toBe(20);
      expect(result.current.disabledQuantity).toBe(5);
    });
    const itemId = 123;

    const mockApiResponse = {
      message: 'Quantities enabled successfully',
      status: 'SUCCESS',
    };
    await act(async () => {
      await result.current.handleDisablebutton(
        itemId,
        result.current.disabledQuantity,
      );
    });

    (ApiService.get as jest.Mock).mockResolvedValue(mockApiResponse);

    waitFor(() => {
      expect(result.current.outofStock).toBe(true);

      expect(result.current.fetchData).toHaveBeenCalled();
      expect(result.current.setRefreshData).toHaveBeenCalledWith(true);
      expect(result.current.setIsModalVisible).toHaveBeenCalledWith(false);
    });
  });
  it('should handle Enable button correctly', async () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook
    waitFor(() => {
      expect(result.current.productQuantity).toBe(10);
      expect(result.current.totalQuantity).toBe(20);
    });
    const itemId = 123;
    const disableQuantity = 5;
    const enableQuantity = 5;

    const mockApiResponse = {
      message: 'Quantities disabled successfully',
      status: 'SUCCESS',
    };
    // Call handleDisablebutton function
    await act(async () => {
      await result.current.handleEnablebutton(
        itemId,
        disableQuantity,
        enableQuantity,
      );
    });

    // Check if ApiService was called with correct URL
    (ApiService.get as jest.Mock).mockResolvedValue(mockApiResponse);

    waitFor(() => {
      expect(result.current.outofStock).toBe(true);

      // Check if fetchData and setRefreshData were called
      expect(result.current.fetchData).toHaveBeenCalled();
      expect(result.current.setRefreshData).toHaveBeenCalledWith(true);
    });
  });
  it('should handle the handleremove correctly', () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook
    act(() => {
      result.current.handleremove();
    });
    waitFor(() => {
      expect(result.current.selectedImage).toBe('');
    });
  });
  it('should handle the handleEdit correctly', () => {
    const data = {
      brand: 'addidas',
      categoryIds: ['mockGender'],
      color: 'black',
      description: 'mockDescription',
      id: 0,
      imageUrl: ['mockImageUrl'],
      material: 'fibre',
      name: 'mockName',
      price: 'mockPrice',
      totalQuantity: 'mockQuantity',
      size: 'mockSize',
      subcategoryIds: ['mockItemType', 'mockOutfitType', 'mockEventType'],
    };
    const {result} = renderHook(() => Useowneredititems()); // Render the hook
    act(() => {
      result.current.handleedit();
    });

    (ApiService.put as jest.Mock).mockResolvedValue(data);
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addsize('mockSize'));
      expect(mockNav).toHaveBeenCalledWith('OwnerProfile');
    });
  });
  it('should dispatch the correct actions and call openModal', async () => {
    const {result} = renderHook(() => Useowneredititems()); // Render the hook
    const productId = '12';
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');

    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      }),
    );
    act(() => {
      result.current.RemoveProducts(productId);
    });
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        removeproducts('mockProductId'),
      );

      expect(result.current.openModal).toHaveBeenCalled();
    });
  });
  test('should increment quantity correctly', () => {
    const {result} = renderHook(() => Useowneredititems());

    // Initial state
    expect(result.current.updatedQuantity).toBe(0);
    expect(result.current.productQuantity).toBe(0);
    expect(result.current.disabledQuantity).toBe(0);
    expect(result.current.isPlusDisabled).toBe(false);

    // Simulate setting up product quantity and disabled quantity
    act(() => {
      result.current.setupdatedquantity(2);
      result.current.setProductQuantity(5);
      result.current.setdisabledQuantity(3);
    });

    // Increment quantity
    act(() => {
      result.current.incrementQuantity();
    });

    expect(result.current.updatedQuantity).toBe(3); // Updated quantity should be incremented by 1
    expect(result.current.isPlusDisabled).toBe(false); // isPlusDisabled should remain false
  });
  test('should increment quantity maxquantity to less', () => {
    const {result} = renderHook(() => Useowneredititems());

    // Initial state
    expect(result.current.updatedQuantity).toBe(0);
    expect(result.current.productQuantity).toBe(0);
    expect(result.current.disabledQuantity).toBe(0);
    expect(result.current.isPlusDisabled).toBe(false);

    // Simulate setting up product quantity and disabled quantity
    act(() => {
      result.current.setupdatedquantity(10);
      result.current.setProductQuantity(5);
      result.current.setdisabledQuantity(3);
    });

    // Increment quantity
    act(() => {
      result.current.incrementQuantity();
    });
    expect(result.current.isPlusDisabled).toBe(true); // isPlusDisabled should remain false
  });
  test('should increment quantity disableQuantity more', () => {
    const {result} = renderHook(() => Useowneredititems());

    // Initial state
    expect(result.current.updatedQuantity).toBe(0);
    expect(result.current.productQuantity).toBe(0);
    expect(result.current.disabledQuantity).toBe(0);
    expect(result.current.isPlusDisabled).toBe(false);

    // Simulate setting up product quantity and disabled quantity
    act(() => {
      result.current.setupdatedquantity(10);
      result.current.setProductQuantity(15);
      result.current.setdisabledQuantity(10);
    });

    // Increment quantity
    act(() => {
      result.current.incrementQuantity();
    });
    expect(result.current.isPlusDisabled).toBe(false); // isPlusDisabled should remain false
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
    (launchImageLibrary as jest.Mock).mockResolvedValue(imageResponse);

    // Render your hook (replace useYourHook with your actual hook)
    const {result} = renderHook(() => Useowneredititems());

    // Call the pickImg function
    await act(async () => {
      await result.current.pickImg();
    });
    // Assertions
    // Verify that AsyncStorage.getItem was called with 'token'
    expect(asyncStorageWrapper.getItem).toHaveBeenCalledWith('token');

    // Verify that launchImageLibrary was called with the correct options
    expect(launchImageLibrary).toHaveBeenCalledWith({
      mediaType: 'photo',
      selectionLimit: 10,
    });
    expect(result.current.imageUrls).toEqual(['mockImageUrl']);
    expect(result.current.selectedImage).toEqual(['mockImageUrl']);
  });
  it('should reject upload images and set image URLs', async () => {
    // Mock token and image response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({urls: ['mockImageUrl']}),
    });
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const imageResponse = {
      didCancel: false,
      assets: [{uri: 'image1.jpg'}, {uri: 'image2.jpg'}],
    };
    (launchImageLibrary as jest.Mock).mockResolvedValue(imageResponse);

    // Render your hook (replace useYourHook with your actual hook)
    const {result} = renderHook(() => Useowneredititems());

    // Call the pickImg function
    await act(async () => {
      await result.current.pickImg();
    });
  });
});
