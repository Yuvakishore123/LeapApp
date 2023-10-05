import {Provider} from 'react-redux';
import MyOrder from '../../../src/screens/MyOrder/MyOrder';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import React from 'react';
import ApiService from 'network/network';

jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('../../../src/screens/MyOrder/useMyOrder', () => () => ({
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
  it('renders loading state correctly', async () => {
    jest.mock('../../../src/screens/MyOrder/useMyOrder', () => () => ({
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
      refreshing: false,
      selectedOrder: null,
      isModalOpen: false,
      loading: true,
      onRefresh: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      handleProfile: jest.fn(),
      showNotification: jest.fn(),
    }));
    const {getByText} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );

    // Wait for the loading text to appear
    await waitFor(() => {
      const loadingText = getByText('The Items are Loading...');
      expect(loadingText).toBeTruthy();
    });
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
    const mockOrderProducts: never[] = []; // Empty array for OrderProducts

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderProducts);

    const {queryByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );

    await waitFor(() => {
      const emptyOrdersMessage = queryByTestId('empty-view'); // Replace with the expected content of the empty orders message
      expect(emptyOrdersMessage).toBeNull();
    });
  });

  it('renders order items correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    const orderCard = getByTestId('order-1');
    expect(orderCard).toBeTruthy();
  });
  it('should render modals in the Order screen', async () => {
    const mockOrderProducts = [
      {
        id: 1,
        orderItems: [{id: 1, createdDate: '2023-07-10', status: 'Completed'}],
      },
    ];

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderProducts);

    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    await waitFor(() => {
      mockOrderProducts.forEach(product => {
        const productName = getByTestId(`order-${product.id}`);
        expect(productName).toBeDefined();
      });
    });
    const OpenModal = getByTestId('order-1');
    fireEvent.press(OpenModal);
    expect(OpenModal).toBeDefined();
  });
  it('should render modal in the Order screen', async () => {
    const mockOrderProducts = [
      {
        id: 1,
        orderItems: [{id: 1, createdDate: '2023-07-10', status: 'Completed'}],
      },
    ];

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderProducts);

    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    await waitFor(() => {
      mockOrderProducts.forEach(order => {
        order.orderItems.forEach(product => {
          const productName = getByTestId(`Order-${order.id}-${product.id}`);
          expect(productName).toBeDefined();
        });
      });
    });

    const OpenModal = getByTestId('Order-1-1');
    fireEvent.press(OpenModal);
    expect(OpenModal).toBeDefined();
  });
});
