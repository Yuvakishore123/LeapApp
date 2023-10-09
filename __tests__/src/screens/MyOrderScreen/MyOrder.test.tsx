import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {NavigationContainer} from '@react-navigation/native';

import MyOrder, {OrderDetailsModal} from 'screens/MyOrder/MyOrder';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import useMyOrder from 'screens/MyOrder/useMyOrder';

jest.mock('@notifee/react-native', () => require('notifee-mocks'));
jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

jest.mock('screens/MyOrder/useMyOrder', () => ({
  OrderProducts: [], // Mocked OrderProducts array
  orderData: {}, // Mocked orderData object
  refreshing: false, // Mocked refreshing value
  selectedOrder: null, // Mocked selectedOrder value
  isModalOpen: false, // Mocked isModalOpen value
  loading: false, // Mocked loading value
  onRefresh: jest.fn(),
  openModal: jest.fn(),
  closeModal: jest.fn(),
  handleProfile: jest.fn(),
  showNotification: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('victory-native', () => ({
  VictoryChart: jest.fn().mockReturnValue(null), // Mock the VictoryChart component
  VictoryBar: jest.fn().mockReturnValue(null), // Mock the VictoryBar component
  VictoryAxis: jest.fn().mockReturnValue(null), // Mock the VictoryAxis component
  VictoryLabel: jest.fn().mockReturnValue(null), // Mock the VictoryLabel component
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@notifee/react-native', () => require('notifee'));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('MyOrder Screen', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        OrderProducts: {data: []},
      }),
    );
    useMyOrder.mockReturnValue({
      useMyOrder: jest.fn(() => ({
        OrderProducts: [], // Mocked OrderProducts array
        orderData: {}, // Mocked orderData object
        refreshing: false, // Mocked refreshing value
        selectedOrder: null, // Mocked selectedOrder value
        isModalOpen: false, // Mocked isModalOpen value
        loading: false, // Mocked loading value
        onRefresh: jest.fn(),
        openModal: jest.fn(),
        closeModal: jest.fn(),
        handleProfile: jest.fn(),
        showNotification: jest.fn(),
      })),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockOrderData = [
    {
      id: 1,
      orderItems: [
        {id: 101, createdDate: '2023-10-09', status: 'Pending'},
        {id: 102, createdDate: '2023-10-10', status: 'Delivered'},
      ],
    },
    {
      id: 2,
      orderItems: [
        {id: 201, createdDate: '2023-10-11', status: 'Processing'},
        {id: 202, createdDate: '2023-10-12', status: 'Cancelled'},
      ],
    },
  ];
  it('render OwnerScreen details', () => {
    const result = render(
      <NavigationContainer>
        <MyOrder />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });
  it('Should render the loading Container details', () => {
    useMyOrder.mockReturnValue({
      loading: true, // Set isLoading to true
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <MyOrder />
      </NavigationContainer>,
    );
    const loadingContainer = getByTestId('Loading-Container');
    expect(loadingContainer).toBeDefined();
  });
  it('Should render the Empty Screen details', () => {
    useMyOrder.mockReturnValue({
      OrderProducts: [],
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <MyOrder />
      </NavigationContainer>,
    );
    const loadingContainer = getByTestId('empty-view');
    const loadingText = getByTestId('order-empty');
    expect(loadingContainer).toBeDefined();
    expect(loadingText).toBeDefined();
  });
  it('Should render the My Order Text Screen ', () => {
    useMyOrder.mockReturnValue({
      OrderProducts: [],
    });
    const {getByText} = render(
      <NavigationContainer>
        <MyOrder />
      </NavigationContainer>,
    );
    const MyOrdertext = getByText('My orders');
    expect(MyOrdertext).toBeDefined();
  });
  it('Should render the OrderDetails on the  Screen ', () => {
    const mockOpenModal = jest.fn();
    useMyOrder.mockReturnValue({
      orderData: mockOrderData,
      openModal: mockOpenModal,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <MyOrder />
      </NavigationContainer>,
    );
    mockOrderData.forEach(order => {
      order.orderItems.forEach(_item => {
        const orderElement = getByTestId(`order-${order.id}`);
        expect(orderElement).toBeDefined();

        // Trigger the press event and check if openModal is called with the correct order
        fireEvent.press(orderElement);
        expect(mockOpenModal).toHaveBeenCalledWith(order);
      });
    });
  });
  it('Should render the OrderItem deatails on the  Screen ', () => {
    const mockOpenModal = jest.fn();

    useMyOrder.mockReturnValue({
      orderData: mockOrderData,
      openModal: mockOpenModal,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <MyOrder />
      </NavigationContainer>,
    );
    mockOrderData.forEach(order => {
      order.orderItems.forEach(item => {
        const orderElement = getByTestId(`order-${order.id}`);
        expect(orderElement).toBeDefined();

        const orderItemElement = getByTestId(`Order-${order.id}-${item.id}`);
        expect(orderItemElement).toBeDefined();

        // Trigger the press event and check if openModal is called with the correct order
        fireEvent.press(orderItemElement);
        expect(mockOpenModal).toHaveBeenCalledWith(order);
      });
    });
  });
  it('Should diisplay the modal and the OrderItem deatails on the  Screen ', () => {
    const mockOpenModal = jest.fn();
    const mockOnclose = jest.fn();
    const mockShowNotifications = jest.fn();
    const mockModalData = {
      id: 1,
      totalPrice: 100, // Replace with the actual total price
      orderItems: [
        {
          id: 101,
          name: 'Product 1', // Replace with the actual product name
          quantity: 2, // Replace with the actual quantity
          rentalStartDate: '2023-10-09', // Replace with the actual date
          rentalEndDate: '2023-10-10', // Replace with the actual date
          status: 'Pending',
          imageUrl: 'https://example.com/image1.jpg', // Replace with a valid image URL
        },
      ],
    };

    useMyOrder.mockReturnValue({
      orderData: mockModalData,
      openModal: mockOpenModal,
      visible: true,
      isModalOpen: true,
    });
    const {getByText} = render(
      <NavigationContainer>
        <OrderDetailsModal
          order={mockOrderData}
          onClose={mockOnclose}
          visible={true}
          showNotifications={mockShowNotifications}
        />
      </NavigationContainer>,
    );
    const downloadButton = getByText('download');
    expect(downloadButton).toBeDefined();
    fireEvent.press(downloadButton);
    expect(mockShowNotifications).toBeCalled();
  });
});
