import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import Useowneredititems from '../../../../src/screens/Owneredititems/Useowneredititems';
import {
  addGenderData,
  removeproducts,
} from '../../../../src/redux/actions/actions';
import ApiService from 'network/network';
import {disableProductUrl, enableProductUrl} from 'constants/apiRoutes';
import {url} from 'constants/Apis';
jest.mock('network/network');
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

jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
describe('editItems', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        GenderReducer: {genderData: {}},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should open modal when openModal is clicked', async () => {
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.showModal).toBe(false);

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.openModal();
    });
    await asyncOperation();

    expect(result.current.showModal).toBe(true);

    // expect(result.current.fetchData).toBeCalled();
    expect(result.current.refreshData).toBe(true);
  });
  it('should close the modal  when openModal is clicked', async () => {
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.showModal).toBe(false);

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.closeModal();
    });
    await asyncOperation();

    expect(result.current.showModal).toBe(false);

    expect(result.current.refreshData).toBe(false);
  });
  it('should set gender data ', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockGender = 'M';

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleGenderChange(mockGender);
    });
    await asyncOperation();

    expect(result.current.gender).toBe(mockGender);
    expect(mockDispatch).toHaveBeenCalledWith(addGenderData(mockGender));
  });
  it('should set the itemData ', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockItem = {
      id: 1,
      name: 'Mocked Item',
      // Add other properties as needed
    };

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleSelectItem(mockItem);
    });
    await asyncOperation();

    expect(result.current.selectedItem).toBe(mockItem);
  });
  it('should fetch the data and set that data ', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockItem = {
      id: 1,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: [2, 4, 6],
      availableQuantities: [1, 3, 5],
      disabled: false,
      totalQuantity: 10,
    };
    ApiService.get.mockResolvedValue(mockItem);

    // You can use this mockItem object in your test cases as needed.

    await act(() => {
      result.current.fetchData();
    });

    waitFor(() => {
      expect(result.current.data).toBe(mockItem);
      expect(result.current.isLoading).toBe(false);
    });
  });
  it('should fetch the data of Particular product ', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockItem = {
      id: 1,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: [2, 4, 6],
      availableQuantities: [1, 3, 5],
      disabled: false,
      totalQuantity: 10,
      description: 'mock description',
    };
    ApiService.get.mockResolvedValue(mockItem);

    // You can use this mockItem object in your test cases as needed.

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.FetchData(mockItem.id);
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.name).toBe(mockItem.name);
      expect(result.current.price).toBe(mockItem.price);
      expect(result.current.quantity).toBe(mockItem.totalQuantity);
      expect(result.current.description).toBe(mockItem.description);
    });
  });
  it('should remove the  images after deleting ', async () => {
    const {result} = renderHook(() => Useowneredititems());

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleremove();
    });
    await asyncOperation();

    expect(result.current.selectedImage).toBe('');
  });
  it('should set the event after selected', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockData = 'Holiday';

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleEventTypeChange(mockData);
    });
    await asyncOperation();

    expect(result.current.eventType).toBe(mockData);
  });
  it('should set the type after selected', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockData = 'Tshirt';

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleOutfitChange(mockData);
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.outfitType).toBe(mockData);
    });
  });
  it('should set the size after selected', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockData = 'L';

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleSizeTypeChange(mockData);
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.selectedsize).toBe(mockData);
    });
  });
  it('should set the Item after selected', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockData = 'Party';

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleItemTypeChange(mockData);
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.itemType).toBe(mockData);
    });
  });
  it('should set the disable the Producs after selected', async () => {
    const mockItem = {
      id: 1,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: 4,
      availableQuantities: 4,
      disabled: false,
      totalQuantity: 10,
    };
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.isModalVisible).toBe(false);

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleDisableProduct(mockItem);
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.disabledQuantity).toBe(mockItem.disabledQuantities);
      expect(result.current.totalQuantity).toBe(mockItem.totalQuantity);
      expect(result.current.selectedProductId).toBe(mockItem.id);
      expect(result.current.productQuantity).toBe(mockItem.availableQuantities);
    });
  });
  it('should set the incrementQuantity the Producs after selected', async () => {
    const mockItem = {
      id: 1,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: 4,
      availableQuantities: 4,
      disabled: false,
      totalQuantity: 10,
    };
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.isModalVisible).toBe(false);

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.incrementQuantity();
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.isPlusDisabled).toBe(true);
    });
  });
  it('should refresh Producs after onrefresh is selected', async () => {
    const mockItem = {
      id: 1,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: 4,
      availableQuantities: 4,
      disabled: false,
      totalQuantity: 10,
    };
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.isModalVisible).toBe(false);

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleRefresh();
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.refreshData).toBe(true);
    });
  });
  it('should set the decrement the Producs after selected', async () => {
    const mockItem = {
      id: 1,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: 4,
      availableQuantities: 10,
      disabled: false,
      totalQuantity: 10,
    };
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.isModalVisible).toBe(false);
    waitFor(() => {
      expect(result.current.productQuantity).toBe(10);
      expect(result.current.totalQuantity).toBe(20);
      expect(result.current.disabledQuantity).toBe(5);
    });

    await act(() => {
      result.current.incrementQuantity();
    });

    await act(() => {
      result.current.decrementQuantity();
    });

    waitFor(() => {
      expect(result.current.updatedQuantity).toBe(1);
    });
  });
  it('should Disable the product the data when button is clicked ', async () => {
    const mockData = {
      id: '3',
      disableQuantity: 4,
      productQuantity: 10,
    };
    const {result} = renderHook(() => Useowneredititems());
    const mockResponse = {
      message: 'successfully disabled',
    };
    ApiService.get.mockResolvedValue(mockResponse);
    const disbleProduct = result.current.productQuantity;
    console.log(disbleProduct);
    waitFor(() => {
      expect(result.current.productQuantity).toBe(10);
      expect(result.current.totalQuantity).toBe(20);
      expect(result.current.disabledQuantity).toBe(5);
    });

    // You can use this mockItem object in your test cases as needed.

    await act(() => {
      result.current.handleDisablebutton(
        mockData.id,
        result.current.disabledQuantity,
      );
    });
    if (mockData.disableQuantity <= mockData.productQuantity) {
      waitFor(() => {
        expect(ApiService.get).toBeCalledWith(disableProductUrl);
      });
    }
    waitFor(() => {
      expect(result.current.refreshData).toBe(true);
      expect(result.current.outofStock).toBe(true);
    });
  });
  it('should enable the product the data when button is clicked ', async () => {
    const mockData = {
      id: '3',
      disableQuantity: 4,
      productQuantity: 10,
    };
    const {result} = renderHook(() => Useowneredititems());
    const mockResponse = {
      message: 'successfully enabled',
    };
    (ApiService.get as jest.Mock).mockResolvedValue(mockResponse);
    const disbleProduct = result.current.productQuantity;
    console.log(disbleProduct);
    waitFor(() => {
      expect(result.current.productQuantity).toBe(10);
      expect(result.current.totalQuantity).toBe(20);
      expect(result.current.disabledQuantity).toBe(5);
    });

    // You can use this mockItem object in your test cases as needed.

    await act(() => {
      result.current.handleEnablebutton(
        mockData.id,
        result.current.updatedQuantity,
        result.current.disabledQuantity,
      );
    });
    if (result.current.updatedQuantity <= mockData.productQuantity) {
      waitFor(() => {
        expect(ApiService.get).toBeCalledWith(enableProductUrl);
      });
    }
    waitFor(() => {
      expect(result.current.refreshData).toBe(true);
      expect(result.current.outofStock).toBe(true);
    });
  });
  it('should submit  the data of edited  Product ', async () => {
    const {result} = renderHook(() => Useowneredititems());

    const moctResponse = {message: 'successfully edited'};
    ApiService.put.mockResolvedValue(moctResponse);

    // You can use this mockItem object in your test cases as needed.

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleedit();
    });
    await asyncOperation();
    waitFor(() => {
      expect(result.current.refreshData).toBe(true);
      expect(mockNav).toBeCalledWith('OwnerProfile');
      expect(ApiService.put).toBeCalledWith(`${url}/product/update/`);
    });
  });
  it('should remove product  when delete is pressed ', async () => {
    const {result} = renderHook(() => Useowneredititems());
    const mockId = '12';

    const moctResponse = {message: 'successfully deleted'};
    ApiService.delete.mockResolvedValue(moctResponse);

    // You can use this mockItem object in your test cases as needed.

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.RemoveProducts(mockId);
    });
    await asyncOperation();

    expect(mockDispatch).toBeCalledWith(removeproducts(mockId));
    expect(ApiService.delete).toBeCalledWith(
      `${url}/product/deleteProduct/${mockId}`,
    );
  });
});
