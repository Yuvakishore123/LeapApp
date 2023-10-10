import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Owneredititems from 'screens/Owneredititems/Owneredititems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Useowneredititems from 'screens/Owneredititems/Useowneredititems';
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: jest.fn(),
      navigate: mockNav,
      // Add other navigation properties and methods as needed
    }),
  };
});
jest.mock('screens/Owneredititems/Useowneredititems', () => ({
  data: [
    {
      id: 1,
      imageUrl: ['image1.jpg'],
      name: 'Product 1',
      price: 10,
    },
  ],
  setGender: jest.fn(),
  name: '',
  handleedit: jest.fn(),
  description: '',
  setEventType: jest.fn(),
  setOutfitType: jest.fn(),
  setItemType: jest.fn(),
  imageUrls: ['image1.png', 'image2.png'],
  setImageUris: jest.fn(),
  selectedImage: '',
  RemoveProducts: jest.fn(),
  closeModal: jest.fn(),
  setShowModal: jest.fn(),
  showModal: false,
  handleremove: jest.fn(),
  pickImg: jest.fn(),
  imageUris: [],
  imageLoaded: false,
  setImageLoaded: jest.fn(),
  handleGenderChange: jest.fn(),
  handleEventTypeChange: jest.fn(),
  handleOutfitChange: jest.fn(),
  handleItemTypeChange: jest.fn(),
  setName: jest.fn(),
  setDescription: jest.fn(),
  setCategoriesData: jest.fn(),
  categoriesData: [],
  subCategoriesData: [],
  subEventCategoriesData: [],
  subOutfitCategoriesData: [],
  handleSizeTypeChange: jest.fn(),
  setSelectedsize: jest.fn(),
  setPrice: jest.fn(),
  price: '',
  visible: false,
  pref: [],
  setViisble: jest.fn(),
  setQuantity: jest.fn(),
  setEditProductId: jest.fn(),
  selectedItem: null,
  FetchData: jest.fn(),
  Mapdata: '',
  quantity: '',
  openModal: jest.fn(),
  isLoading: false,
  setIsLoading: jest.fn(),
  fetchData: jest.fn(),
  setIsModalVisible: jest.fn(),
  handleDisablebutton: jest.fn(),
  setIsMinusDisabled: jest.fn(),
  setIsPlusDisabled: jest.fn(),
  incrementQuantity: jest.fn(),
  decrementQuantity: jest.fn(),
  isModalVisible: false,
  isMinusDisabled: true,
  isPlusDisabled: false,
  productQuantity: 0,
  gender: '',
  selectedProductId: null,
  outofStock: false,
  setOutofstock: jest.fn(),
  handleEnablebutton: jest.fn(),
  setSelectedProductId: jest.fn(),
  totalQuantity: 0,
  updatedQuantity: 0,
  disabledQuantity: 0,
  refreshData: false,
  setRefreshData: jest.fn(),
  handleRefresh: jest.fn(),
  eventType: '',
  outfitType: '',
  itemType: '',
  setPrefill: jest.fn(),
  handleDisableProduct: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));

describe('OwnerEditItems Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
        },
      ],
      setGender: jest.fn(),
      name: '',
      handleedit: jest.fn(),
      description: '',
      setEventType: jest.fn(),
      setOutfitType: jest.fn(),
      setItemType: jest.fn(),
      imageUrls: ['image1.png', 'image2.png'],
      setImageUris: jest.fn(),
      selectedImage: '',
      RemoveProducts: jest.fn(),
      closeModal: jest.fn(),
      setShowModal: jest.fn(),
      showModal: false,
      handleremove: jest.fn(),
      pickImg: jest.fn(),
      imageUris: [],
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      handleGenderChange: jest.fn(),
      handleEventTypeChange: jest.fn(),
      handleOutfitChange: jest.fn(),
      handleItemTypeChange: jest.fn(),
      setName: jest.fn(),
      setDescription: jest.fn(),
      setCategoriesData: jest.fn(),
      categoriesData: [],
      subCategoriesData: [],
      subEventCategoriesData: [],
      subOutfitCategoriesData: [],
      handleSizeTypeChange: jest.fn(),
      setSelectedsize: jest.fn(),
      setPrice: jest.fn(),
      price: '',
      visible: false,
      pref: [],
      setViisble: jest.fn(),
      setQuantity: jest.fn(),
      setEditProductId: jest.fn(),
      selectedItem: null,
      FetchData: jest.fn(),
      Mapdata: '',
      quantity: '',
      openModal: jest.fn(),
      isLoading: false,
      setIsLoading: jest.fn(),
      fetchData: jest.fn(),
      setIsModalVisible: jest.fn(),
      handleDisablebutton: jest.fn(),
      setIsMinusDisabled: jest.fn(),
      setIsPlusDisabled: jest.fn(),
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      isModalVisible: true,
      isMinusDisabled: true,
      isPlusDisabled: false,
      productQuantity: 0,
      gender: '',
      selectedProductId: null,
      outofStock: false,
      setOutofstock: jest.fn(),
      handleEnablebutton: jest.fn(),
      setSelectedProductId: jest.fn(),
      totalQuantity: 0,
      updatedQuantity: 0,
      disabledQuantity: 0,
      refreshData: false,
      setRefreshData: jest.fn(),
      handleRefresh: jest.fn(),
      eventType: '',
      outfitType: '',
      itemType: '',
      setPrefill: jest.fn(),
      handleDisableProduct: jest.fn(),
    });
  });
  it('renders OwnerEditItems screen', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
  it('images should be handled', () => {
    const Stack = createNativeStackNavigator();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
        },
      ],
      imageUrls: ['image1.png'],
      setRefreshData: jest.fn(),
      selectedImage: 'image.png',
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('image');
    expect(image).toBeDefined();
  });
  it('handle Fetchdata when edit button is pressed', () => {
    const mockFetchData = jest.fn();
    const mockEditProductid = jest.fn();
    const visible = jest.fn();
    const Stack = createNativeStackNavigator();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
        },
      ],
      imageUrls: ['image1.png'],
      setRefreshData: jest.fn(),
      selectedImage: 'image.png',
      FetchData: mockFetchData,
      setViisble: visible,
      setEditProductId: mockEditProductid,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('editButton');
    act(() => {
      fireEvent.press(image);
    });
    expect(mockFetchData).toBeCalled();
    expect(mockEditProductid).toBeCalled();
    expect(visible).toBeCalled();
  });
  it('handle handleDisableProduct when Manage button is pressed', () => {
    const SelectedProductId = jest.fn();
    const DisableProduct = jest.fn();
    const Stack = createNativeStackNavigator();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
        },
      ],
      imageUrls: ['image1.png'],
      setRefreshData: jest.fn(),
      selectedImage: 'image.png',
      setSelectedProductId: SelectedProductId,
      handleDisableProduct: DisableProduct,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('ManageButton');
    act(() => {
      fireEvent.press(image);
    });
    expect(SelectedProductId).toBeCalled();
    expect(DisableProduct).toBeCalled();
  });
  it('handle handleRemove when Delete button is pressed', () => {
    const RemoveProduct = jest.fn();
    const Stack = createNativeStackNavigator();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
        },
      ],
      imageUrls: ['image1.png'],
      setRefreshData: jest.fn(),
      selectedImage: 'image.png',
      RemoveProducts: RemoveProduct,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('removeButton');
    act(() => {
      fireEvent.press(image);
    });
    expect(RemoveProduct).toBeCalled();
  });
  it('handle Modal when edit button is pressed', () => {
    const DisableProduct = jest.fn();
    const visible = jest.fn();
    const modalVisible = jest.fn();
    const SelectedProductId = jest.fn();
    const Stack = createNativeStackNavigator();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
        },
      ],
      imageUrls: ['image1.png'],
      setRefreshData: jest.fn(),
      selectedImage: 'image.png',
      setViisble: visible,
      isModalVisible: true,
      setIsModalVisible: modalVisible,
      setSelectedProductId: SelectedProductId,
      handleDisableProduct: DisableProduct,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('ManageButton');
    act(() => {
      fireEvent.press(image);
    });
    const closebutton = getByTestId('closeButton');
    act(() => {
      fireEvent.press(closebutton);
    });
    expect(modalVisible).toBeCalledWith(false);
  });
  it('handle handledisable when disable button is pressed', () => {
    const visible = jest.fn();
    const modalVisible = jest.fn();
    const disablebutton = jest.fn();
    const Stack = createNativeStackNavigator();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
          totalQuantity: 10,
        },
      ],
      imageUrls: ['image1.png'],
      setRefreshData: jest.fn(),
      selectedImage: 'image.png',
      setViisble: visible,
      isModalVisible: true,
      setIsModalVisible: modalVisible,
      handleDisablebutton: disablebutton,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('disbalebutton');
    act(() => {
      fireEvent.press(image);
    });
    expect(disablebutton).toBeCalled();
  });
  it('handle Enablebutton when enable button is pressed', () => {
    const visible = jest.fn();
    const modalVisible = jest.fn();
    const enablebutton = jest.fn();
    const Stack = createNativeStackNavigator();
    (Useowneredititems as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
          totalQuantity: 10,
        },
      ],
      imageUrls: ['image1.png'],
      setRefreshData: jest.fn(),
      selectedImage: 'image.png',
      setViisble: visible,
      isModalVisible: true,
      setIsModalVisible: modalVisible,
      handleEnablebutton: enablebutton,
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('enablebutton');
    act(() => {
      fireEvent.press(image);
    });
    expect(enablebutton).toBeCalled();
  });
});
