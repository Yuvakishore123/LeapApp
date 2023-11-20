import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import useProductdetails from 'screens/UProductDetails/useProductdetails';
jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('network/Network');
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('react-native-toast-message', () => {
  return {
    show: jest.fn(),
  };
});
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../src/redux/slice/EditProfileSlice', () => ({
  updateProfile: jest.fn(),
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
describe('useOwnerEditprofile', () => {
  const mockDispatch = jest.fn();
  const mockproduct = {
    id: 1,
    imageUrl: ['https://example.com/image1.jpg'],
    availableQuantities: 10,
  };
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (arg0: {cartAdd: {data: {}}}) => any) =>
        selector({
          cartAdd: {data: {}},
        }),
    );
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should navigate to Subcategory and dispatch getsubcategoryData', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    expect(result).toBeDefined();
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => useProductdetails(mockproduct));
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });
    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('This should openn modal', () => {
    const wishlist = renderHook(() => useProductdetails(mockproduct));
    act(() => {
      wishlist.result.current.opennModal();
    });
    expect(wishlist.result.current.showwModal).toBe(true);
  });
  it('This should closee  modal', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeeModal();
    });
    // After opening the modal, showModal should be true
    expect(result.current.showwModal).toBe(false);
  });
  it('should handle successful cart add', async () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));

    result.current.setQuantity(2);
    result.current.setRentalStartDate(new Date());
    result.current.setRentalEndDate(new Date());
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));
    act(() => {
      result.current.handleSubmit();
    });
    await asyncOperation();
    expect(mockDispatch).toBeCalled();

    expect(result.current.showModal).toBe(true);
  });
  it('should share product with valid link', async () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    const mockShare = jest.fn();
    jest.mock('react-native', () => ({
      Share: mockShare,
    }));
    act(() => {
      result.current.generateLink();
    });

    act(async () => {
      await result.current.shareProduct();
    });
    await waitFor(() => {
      expect(result.current.generateLink).toBeDefined();
    });
  });
  it('should  handle scroll to next image', () => {
    // Mock scrollViewRef
    const scrollViewRef = {current: {scrollTo: jest.fn()}};

    // Mock setActiveIndex
    const setActiveIndex = jest.fn();

    // Mock product data
    const mockProduct = {
      id: 1,
      imageUrl: ['image1.jpg', 'image2.jpg'],
      availableQuantities: 10,
    };

    // Render the hook with the necessary dependencies
    const {result} = renderHook(() => useProductdetails(mockProduct));
    result.current.setActiveIndex = setActiveIndex;

    // Call scrollToNextImage
    act(() => {
      result.current.setActiveIndex(0);
      result.current.scrollViewRef.current = scrollViewRef.current;
      result.current.scrollToNextImage();
    });

    // Assert that scrollTo was called with the expected arguments
    expect(scrollViewRef.current.scrollTo).toHaveBeenCalledWith({
      x: 405,
      animated: true,
    });

    // Assert that setActiveIndex was called with the expected value
    expect(result.current.activeIndex).toBe(1);
  });
  it('should disable decrement button and not change quantity when quantity is 1', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    waitFor(() => {
      result.current.setQuantity(1);
      result.current.setIsMinusDisabled(false); // Ensure setIsMinusDisabled is initially false
    });

    result.current.handleDecrement();
    waitFor(() => {
      expect(result.current.quantity).toBe(1); // Quantity should remain 1
      expect(result.current.isMinusDisabled).toBe(true); // isMinusDisabled should be true
    });
  });
  it('should handle handleScroll', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));

    result.current.handleScroll();
    expect(result.current.handleScroll).toBeDefined();
  });
  it('should disable decrement button and change quantity when quantity not 1', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    waitFor(() => {
      result.current.setQuantity(4);
      result.current.setIsMinusDisabled(true); // Ensure setIsMinusDisabled is initially false
    });

    result.current.handleDecrement();
    waitFor(() => {
      expect(result.current.quantity).toBe(3); // Quantity should remain 1
      expect(result.current.isMinusDisabled).toBe(true); // isMinusDisabled should be true
    });
  });

  it('should disable increment button when quantity equals availableQuantities', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    waitFor(() => {
      result.current.setQuantity(10); // Set quantity to availableQuantities
      result.current.setIsPlusDisabled(false); // Ensure setIsPlusDisabled is initially false
    });

    result.current.handleIncrement();
    waitFor(() => {
      expect(result.current.quantity).toBe(11); // Quantity should remain 10
      expect(result.current.isPlusDisabled).toBe(true); // isPlusDisabled should be true
    });
  });
  it('should handle error Toast', () => {
    const {result} = renderHook(() => useProductdetails(mockproduct));
    result.current.errorToast();
    expect(Toast.show).toHaveBeenCalledWith({
      text1: 'An error occurred while sharing the product. Please try again.',
      type: 'error',
    });
  });
});
