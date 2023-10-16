import {Provider, useDispatch} from 'react-redux';
import MyOrder, {OrderDetailsModal} from '../../../src/screens/MyOrder/MyOrder';
import {act, fireEvent, render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMyOrder from 'screens/MyOrder/useMyOrder';

jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../src/screens/MyOrder/useMyOrder', () => ({
  default: jest.fn(),
  __esModule: true,
  OrderProducts: [
    {
      id: 1,
      orderItems: [
        {
          id: 1,
          imageUrl: 'https://example.com/image.jpg',
          status: 'Order placed',
          createdDate: '2023-09-27',
        },
        // Add more order items as needed for testing
      ],
    },
    // Add more orders as needed for testing
  ],
  orderData: {
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
  },
  refreshing: false,
  selectedOrder: null,
  isModalOpen: false,
  loading: false,
  onRefresh: jest.fn(),
  openModal: jest.fn(),
  closeModal: jest.fn(),
  handleProfile: jest.fn(),
  showNotification: jest.fn(),
}));
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const mockNavigation = {
    navigate: mockNavigate,
    addListener: jest.fn(),
  };
  return {
    useNavigation: () => mockNavigation,
  };
});
describe('My Order Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useMyOrder as jest.Mock).mockReturnValue({
      OrderProducts: [
        {
          id: 1,
          orderItems: [
            {
              id: 1,
              imageUrl: 'https://example.com/image.jpg',
              status: 'Order placed',
              createdDate: '2023-09-27',
            },
            // Add more order items as needed for testing
          ],
        },
        // Add more orders as needed for testing
      ],
      orderData: {
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
      },
      refreshing: false,
      selectedOrder: null,
      isModalOpen: false,
      loading: false,
      onRefresh: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      handleProfile: jest.fn(),
      showNotification: jest.fn(),
    });
  });
  it('renders loading state correctly', async () => {
    (useMyOrder as jest.Mock).mockReturnValue({
      loading: true,
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );

    const loadingText = getByTestId('loading-state');
    expect(loadingText).toBeTruthy();
  });
  it('should call openModal correctly', async () => {
    const openmodals = jest.fn();
    (useMyOrder as jest.Mock).mockReturnValue({
      openModal: openmodals,
      OrderProducts: [
        {
          id: 1,
          orderItems: [
            {
              id: 1,
              imageUrl: 'https://example.com/image.jpg',
              status: 'Order placed',
              createdDate: '2023-09-27',
            },
            // Add more order items as needed for testing
          ],
        },
        // Add more orders as needed for testing
      ],
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );

    const openText = getByTestId('Order-1-1');
    act(() => {
      fireEvent.press(openText);
    });
    expect(openmodals).toBeCalled();
  });

  it('Should render My order screen', async () => {
    const result = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
  it('should render empty screen when OrderProducts is empty', async () => {
    (useMyOrder as jest.Mock).mockReturnValue({
      OrderProducts: [],
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    const emptyView = getByTestId('empty-view');
    expect(emptyView).toBeDefined();
  });

  it('renders order items correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    const orderproducts = getByTestId('order-1');
    expect(orderproducts).toBeDefined();
  });
  it('should render modals in the Order screen', async () => {
    const mockData = {
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
    (useMyOrder as jest.Mock).mockReturnValue({
      isModalOpen: true,
      order: mockData,
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <OrderDetailsModal
          order={mockData}
          onClose={function (): void {
            throw new Error('Function not implemented.');
          }}
          visible={true}
          showNotifications={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Provider>,
    );
    const modalvisible = getByTestId('order-details-modal');
    const orderDetails = getByTestId('order-Details');
    expect(modalvisible).toBeDefined();
    expect(orderDetails).toBeDefined();
  });
});
