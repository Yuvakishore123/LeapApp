import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OwnerHome from 'screens/OwnerHomepage/OwnerHome';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('screens/OwnerHomepage/useOwnerHome', () => {
  return () => ({
    products: [
      {
        id: 1,
        imageUrl: ['https://example.com/image1.jpg'],
        name: 'Product 1',
        price: 10,
      },
    ],
    name: {firstName: 'John'},
    isLoading: false,
    refreshing: false,
    onRefresh: jest.fn(),
    handleAnalatyics: jest.fn(),
    recentyAdded: [
      {
        id: 2,
        imageUrl: ['https://example.com/image2.jpg'],
        name: 'Product 2',
        price: 20,
      },
    ],
    refreshTrigger: false,
    rentedItemsPercentage: 50,
    totalEarningsPercentage: 70,
  });
});

describe('SignUpScreen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  it('renders correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OwnerHome" component={OwnerHome} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  it('renders Recently Added section with correct data', async () => {
    const {getByText} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={undefined}
      />,
    );

    // Check if the product name is rendered
    await waitFor(() => expect(getByText('Product 2')).toBeTruthy());

    // Check if the product price is rendered
    await waitFor(() => expect(getByText('₹ 20')).toBeTruthy());
  });

  it('renders Rental History section with correct data', async () => {
    const {getByText} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={undefined}
      />,
    );

    // Check if the product name is rendered
    await waitFor(() => expect(getByText('Product 1')).toBeTruthy());

    // Check if the product price is rendered
    await waitFor(() => expect(getByText('₹ 10')).toBeTruthy());
  });
});
