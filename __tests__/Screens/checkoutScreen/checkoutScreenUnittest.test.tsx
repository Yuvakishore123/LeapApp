import React from 'react';
import {render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import CheckoutScreen from '../../../src/screens/CheckoutScreen/CheckoutScreen';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
jest.mock('react-native-razorpay', () => ({
  open: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {address: {}},
  }),
}));
describe('renders checkout Screen', () => {
  it('should render EditAddress Page', () => {
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={undefined}
          />
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
});
