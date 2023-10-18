import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EditItem from 'screens/Owneredititems/Owneredititems';
import Useowneredititems from 'screens/Owneredititems/Useowneredititems';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('react-native-razorpay', () => require('razorpay-mock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('screens/Owneredititems/Useowneredititems', () => ({
  data: [],
  setGender: jest.fn(),
  visible: false,
  setViisble: jest.fn(),
  handleedit: jest.fn(),
  setEventType: jest.fn(),
  setOutfitType: jest.fn(),
  setItemType: jest.fn(),
  imageUrls: [],
  selectedImage: null,
  RemoveProducts: jest.fn(),
  closeModal: jest.fn(),
  showModal: jest.fn(),
  handleremove: jest.fn(),
  name: '',
  pickImg: jest.fn(),
  handleGenderChange: jest.fn(),
  handleEventTypeChange: jest.fn(),
  handleOutfitChange: jest.fn(),
  handleItemTypeChange: jest.fn(),
  setName: jest.fn(),
  setDescription: jest.fn(),
  handleSizeTypeChange: jest.fn(),
  setSelectedsize: jest.fn(),
  setPrice: jest.fn(),
  setQuantity: jest.fn(),
  setEditProductId: jest.fn(),
  FetchData: jest.fn(),
  description: '',
  price: 0,
  quantity: 0,
  isLoading: false,
  productQuantity: 0,
  isModalVisible: false,
  selectedProductId: null,
  setSelectedProductId: jest.fn(),
  handleEnablebutton: jest.fn(),
  setIsModalVisible: jest.fn(),
  handleDisablebutton: jest.fn(),
  handleDisableProduct: jest.fn(),
  incrementQuantity: jest.fn(),
  decrementQuantity: jest.fn(),
  disabledQuantity: 0,
  totalQuantity: 0,
  updatedQuantity: jest.fn(),
  refreshData: false,

  handleRefresh: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));

const Stack = createNativeStackNavigator();
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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe('EditItem Screen', () => {
  const mockDispatch = jest.fn();
  const mockItem = [
    {
      id: 1,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: [2, 4, 6],
      availableQuantities: [1, 3, 5],
      disabled: false,
      totalQuantity: 10,
    },
    {
      id: 2,
      name: 'Mocked Item',
      price: 10.99,
      image: 'mocked-image-url.jpg',
      disabledQuantities: [2, 4, 6],
      availableQuantities: [1, 3, 5],
      disabled: false,
      totalQuantity: 10,
    },
  ];

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (Useowneredititems as jest.Mock).mockReturnValue({
      Useowneredititems: jest.fn(() => ({
        data: [],
        setGender: jest.fn(),
        visible: false,
        setViisble: jest.fn(),
        handleedit: jest.fn(),
        setEventType: jest.fn(),
        setOutfitType: jest.fn(),
        setItemType: jest.fn(),
        imageUrls: [],
        selectedImage: null,
        RemoveProducts: jest.fn(),
        closeModal: jest.fn(),
        showModal: jest.fn(),
        handleremove: jest.fn(),
        name: '',
        pickImg: jest.fn(),
        handleGenderChange: jest.fn(),
        handleEventTypeChange: jest.fn(),
        handleOutfitChange: jest.fn(),
        handleItemTypeChange: jest.fn(),
        setName: jest.fn(),
        setDescription: jest.fn(),
        handleSizeTypeChange: jest.fn(),
        setSelectedsize: jest.fn(),
        setPrice: jest.fn(),
        setQuantity: jest.fn(),
        setEditProductId: jest.fn(),
        FetchData: jest.fn(),
        description: '',
        price: 0,
        quantity: 0,
        isLoading: false,
        productQuantity: 0,
        isModalVisible: false,
        selectedProductId: null,
        setSelectedProductId: jest.fn(),
        handleEnablebutton: jest.fn(),
        setIsModalVisible: jest.fn(),
        handleDisablebutton: jest.fn(),
        handleDisableProduct: jest.fn(),
        incrementQuantity: jest.fn(),
        decrementQuantity: jest.fn(),
        disabledQuantity: 0,
        totalQuantity: 0,
        updatedQuantity: jest.fn(),
        refreshData: false,

        handleRefresh: jest.fn(),
      })),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the EditItem Screen', () => {
    // Define a mock route with the necessary params

    const EditItems = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(EditItems).toBeDefined();
  });
  it('should close the modal when clicked', () => {
    const mockSetVisible = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      Useowneredititems: jest.fn(() => ({
        setVisble: mockSetVisible,
        visible: false,
      })),
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const closeButton = getByTestId('close-Button');
    expect(closeButton).toBeDefined();
  });

  it('should render the price text input Iage', () => {
    (Useowneredititems as jest.Mock).mockReturnValue({
      Useowneredititems: jest.fn(() => ({
        selectedImage: getByPlaceholderText,
        visible: true,
      })),
    });

    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const pricetextInput = getByPlaceholderText('Set price'); // Adjust the test ID to include an index
    expect(pricetextInput).toBeDefined();
  });
  it('should render the Size text input ', () => {
    const selectedImage = 'image-url'; // Provide a selected image URL

    (Useowneredititems as jest.Mock).mockReturnValue({
      Useowneredititems: jest.fn(() => ({
        selectedImage: selectedImage,
        visible: true,
      })),
    });

    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const SizetextInput = getByPlaceholderText('Set quantity'); // Adjust the test ID to include an index
    expect(SizetextInput).toBeDefined();
  });
  it('should render Loading Container', async () => {
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: true,
      visible: false,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    // Use waitFor to wait for the element with testID 'Loading-container'
    await waitFor(() => {
      const LoadingContainer = getByTestId('Loading-container');
      expect(LoadingContainer).toBeDefined();
    });
  });
  it('should render Data and map them ', async () => {
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      visible: false,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    // Use waitFor to wait for the element with testID 'Loading-container'
    await waitFor(() => {
      const LoadingContainer = getByTestId('card-container-1');
      expect(LoadingContainer).toBeDefined();
    });
  });
  it('should open modal when Edit Button is clicked ', async () => {
    const mockHandleButton = jest.fn();
    const mockEditProductId = jest.fn();
    const mockSetVisible = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      FetchData: mockHandleButton,
      setEditProductId: mockEditProductId,
      setVisible: mockSetVisible,

      visible: false,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const EditButton = getByTestId('Edit-1');
    expect(EditButton).toBeDefined();

    fireEvent.press(EditButton);
    expect(mockEditProductId).toHaveBeenCalledWith(1);
    expect(mockHandleButton).toHaveBeenCalledWith(1);
    expect(mockSetVisible).toHaveBeenCalledWith(true);
  });
  it('should open modal for manage when Manage Button is clicked ', async () => {
    const mockManageButton = jest.fn();
    const mockSelectedProductId = jest.fn();
    const mockSetVisible = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      handleDisableProduct: mockManageButton,
      setSelectedProductId: mockSelectedProductId,
      setVisible: mockSetVisible,

      visible: false,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const manageButton = getByTestId('Manage-1');
    expect(manageButton).toBeDefined();

    fireEvent.press(manageButton);
    expect(mockSelectedProductId).toHaveBeenCalledWith(1);
    expect(mockManageButton).toHaveBeenCalledWith(mockItem[0]);
  });
  it('should remove product when remove button is clicked ', async () => {
    const mockRemove = jest.fn();

    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      RemoveProducts: mockRemove,
      visible: false,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const manageButton = getByTestId('Remove-1');
    expect(manageButton).toBeDefined();

    fireEvent.press(manageButton);
    expect(mockRemove).toHaveBeenCalledWith(1);
  });
  it('should Close the modal  ', async () => {
    const mockSetVisible = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      setIsModalVisible: mockSetVisible,

      visible: false,
      isModalVisible: true,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const ModalContainer = getByTestId('Modal-Container-1');
    expect(ModalContainer).toBeDefined();
    const CloseModal = getByTestId('CloseModal-1');
    expect(CloseModal).toBeDefined();
    fireEvent.press(CloseModal);
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });
  it('should decrement the Quantity ', async () => {
    const mockDecrementQuantity = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,

      decrementQuantity: mockDecrementQuantity,

      visible: false,
      isModalVisible: true,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const QuantityButton = getByTestId('decrement-1');
    expect(QuantityButton).toBeDefined();
    fireEvent.press(QuantityButton);
    expect(mockDecrementQuantity).toHaveBeenCalled();
  });
  it('should increment the Quantity ', async () => {
    const mockIncrementQuantity = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,

      incrementQuantity: mockIncrementQuantity,

      visible: false,
      isModalVisible: true,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const QuantityButton = getByTestId('Increment-1');
    expect(QuantityButton).toBeDefined();
    fireEvent.press(QuantityButton);
    expect(mockIncrementQuantity).toHaveBeenCalled();
  });
  it('should disable  the Quantity ', async () => {
    const mockDisabledQuantity = jest.fn();
    const mockSlectedId = jest.fn();
    const mockUpdatedQuantity = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      selectedProductId: mockSlectedId,
      updatedQuantity: mockUpdatedQuantity,

      handleDisablebutton: mockDisabledQuantity,

      visible: false,
      isModalVisible: true,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const DisableButton = getByTestId('disable-1');
    expect(DisableButton).toBeDefined();
    fireEvent.press(DisableButton);
    expect(mockDisabledQuantity).toHaveBeenCalledWith(
      mockSlectedId,
      mockUpdatedQuantity,
    );
  });
  it('should Enable  the Quantity ', async () => {
    const mockEnableQuantity = jest.fn();
    const mockSlectedId = jest.fn();
    const mockUpdatedQuantity = jest.fn();
    const mockDisabledQuantity = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      selectedProductId: mockSlectedId,
      updatedQuantity: mockUpdatedQuantity,
      disabledQuantity: mockDisabledQuantity,

      handleEnablebutton: mockEnableQuantity,

      visible: false,
      isModalVisible: true,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const EnableButton = getByTestId('Enable-1');
    expect(EnableButton).toBeDefined();
    fireEvent.press(EnableButton);
    expect(mockEnableQuantity).toHaveBeenCalledWith(
      mockSlectedId,
      mockUpdatedQuantity,
      mockDisabledQuantity,
    );
  });
  it('should Close the EditItems Modal  ', async () => {
    const mockSetVisible = jest.fn();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      setVisible: mockSetVisible,

      visible: true,
      isModalVisible: true,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const closeButton = getByTestId('close-Button');
    expect(closeButton).toBeDefined();
    fireEvent.press(closeButton);
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });
  it('should Display data and images   ', async () => {
    const mockSetVisible = jest.fn();
    const mockImageUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      // Add more image URLs as needed
    ];
    const selectedImage = 'image-url';
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: mockItem,
      isLoading: false,
      setVisible: mockSetVisible,
      selectedImage: selectedImage,
      visible: true,
      imageUrls: mockImageUrls,
      isModalVisible: true,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const ImageComponent = getByTestId('image-1');
    expect(ImageComponent).toBeDefined();
  });
});
