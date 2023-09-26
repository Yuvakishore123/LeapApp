import {render} from '@testing-library/react-native';
import CategoryProducts from '../../../src/screens/CategoryProducts/CategoryProducts';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';

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
describe('Category Products', () => {
  const subcategoryId = '1';
  const route = {params: {subcategoryId}};
  it('Should render Category Products Screen', () => {
    const result = render(
      <Provider store={store}>
        <CategoryProducts route={route} />
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
});
