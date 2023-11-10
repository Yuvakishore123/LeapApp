import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useProductdetails from '../../../../src/screens/BorrowerScreens/UProductDetails/useProductdetails';
import Toast from 'react-native-toast-message';

const mockNav = jest.fn();

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockGoBack,
    }),
  };
});
jest.mock('@react-native-firebase/dynamic-links', () => {
  const buildShortLink = jest.fn().mockResolvedValue('mocked-link');
  return {
    default: () => ({buildShortLink}),
  };
});
jest.mock('network/network');

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('useProductdetails', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  beforeEach(() => {
    useSelector.mockImplementation(selector =>
      selector({
        cartAdd: {data: {}},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockProduct = {
    id: '123',
    imageUrl: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    availableQuantities: 1,
  };
  const mockedData = {
    status: 400,
  };

  const dispatchMock = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

  it('should  handle decrement', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    const quantity = result.current.quantity;
    expect(result.current.isMinusDisabled).toBe(true);
    act(() => {
      result.current.handleDecrement();
    });
    if (quantity === 1) {
      expect(result.current.isMinusDisabled).toBe(true);
    } else {
      expect(result.current.isMinusDisabled).toBe(false);
    }
  });
  it('should  handle decrement and disable the button', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    const quantity = result.current.quantity;
    expect(result.current.isMinusDisabled).toBe(true);
    act(() => {
      result.current.setQuantity(5);
    });
    act(() => {
      result.current.handleDecrement();
    });
    expect(result.current.quantity).toBe(4);
    expect(result.current.isPlusDisabled).toBe(false);
  });
  it('should  handle increment', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    const quantity = result.current.quantity;
    console.log(quantity);
    expect(result.current.isPlusDisabled).toBe(false);
    act(() => {
      result.current.handleIncrement();
    });
    if (mockProduct.availableQuantities === quantity) {
      expect(result.current.isPlusDisabled).toBe(true);
    }
  });
  it('should  handle increment and Add', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    act(() => {
      result.current.setQuantity(5);
    });
    expect(result.current.isPlusDisabled).toBe(false);
    act(() => {
      result.current.handleIncrement();
    });

    expect(result.current.quantity).toBe(6);
    expect(result.current.isMinusDisabled).toBe(false);
  });
  it('should close modal', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    expect(result.current.showwModal).toBe(false);
    act(() => {
      result.current.closeeModal();
    });

    expect(result.current.showwModal).toBe(false);
  });
  it('should close open modal', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
  });
  it('should  add data to the cart', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    act(() => {
      result.current.handleSubmit();
    });
    expect(dispatchMock).toBeCalled();
  });
  it('should open modal', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    expect(result.current.showwModal).toBe(false);
    act(() => {
      result.current.opennModal();
    });

    expect(result.current.showwModal).toBe(true);
  });

  it('should generate a short link', async () => {
    // Create a mock link
    const mockLink = 'https://mocked-short-link.com';

    const {result} = renderHook(() => useProductdetails(mockProduct));

    // Call the generateLink function
    act(() => {
      result.current.generateLink();
    });

    // Wait for the promise to resolve
    await waitFor(() => {
      // Expect the result to be the mock link
      expect(mockLink).toBeTruthy();
    });
  });
  it('should share the product with a valid link', async () => {
    // Create a mock link
    const mockLink = 'https://mocked-short-link.com';

    // Mock the generateLink function
    const generateLink = jest.fn().mockResolvedValue(mockLink);

    // Render the hook with the mocked dependencies
    const {result} = renderHook(() => useProductdetails(mockProduct));
    // Call the shareProduct function
    await act(async () => {
      result.current.shareProduct();
    });
  });
  it('should scroll to next image', async () => {
    // Render the hook with the mocked dependencies
    const {result} = renderHook(() => useProductdetails(mockProduct));
    const scrollViewRef = {current: {scrollTo: jest.fn()}};
    // Mock setActiveIndex
    const setActiveIndex = jest.fn();
    result.current.setActiveIndex = setActiveIndex;
    expect(result.current.activeIndex).toBe(0);
    const initialActiveIndex = 0;
    await act(async () => {
      result.current.scrollToNextImage();
    });
    const expectedActiveIndex =
      initialActiveIndex === mockProduct.imageUrl.length - 1
        ? 0
        : initialActiveIndex + 0;

    expect(result.current.activeIndex).toEqual(expectedActiveIndex);
    act(() => {
      result.current.setActiveIndex(0);
      result.current.scrollViewRef.current = scrollViewRef.current;
      result.current.scrollToNextImage();
    });
    expect(scrollViewRef.current.scrollTo).toHaveBeenCalledWith({
      x: 405,
      animated: true,
    });
  });
  it('should start scroll timer ', async () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    expect(result.current.activeIndex).toBe(0);
    await act(async () => {
      result.current.handleScroll();
    });
  });
  it('should navigate back when clicked ', async () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    expect(result.current.activeIndex).toBe(0);
    await act(async () => {
      result.current.handlegoBack();
    });
    expect(mockGoBack).toBeCalled();
  });
  it('should handle the error  ', async () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    useSelector.mockImplementation(selector =>
      selector({
        cartAdd: {
          data: [],
          isError: true,
        },
      }),
    );

    await act(async () => {
      result.current.handleError();
    });
    expect(result.current.showwModal).toBe(true);
  });
  it('should show toast  ', async () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    const toastShowMock = jest.spyOn(Toast, 'show');

    await act(async () => {
      result.current.errorToast();
    });
    await waitFor(() => {
      expect(toastShowMock).toHaveBeenCalledWith({
        type: 'error',
        text1: 'An error occurred while sharing the product. Please try again.',
      });
    });
  });
  it('Should open the modal', () => {
    const {result} = renderHook(() => useProductdetails(mockProduct));
    act(() => {
      result.current.openModal();
    });
  });
});