import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import Togglebutton from 'components/atoms/Colorscheme/Togglebutton';

import {ColorSchemeContext as ColorSchemeContextMock} from '../../../../__mocks__/ColorSchemeMock';

jest.mock('../../../../../src/utils/asyncStorage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  return {
    ...originalModule,
    useContext: jest.fn(() => ({
      colorScheme: 'dark',
      toggleColorScheme: jest.fn(),
    })),
  };
});

jest.mock('network/network');

jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

describe('SwitchAccountButton', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    useSelector.mockImplementation(selector =>
      selector({
        Rolereducer: 'Owner',
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    const {getByTestId} = render(<Togglebutton />);

    expect(getByTestId('toggle-container')).toBeTruthy();
  });
  it('should Get the Dark Scheme toggle Button ', () => {
    const {getByTestId} = render(<Togglebutton />);

    expect(getByTestId('switch-dark')).toBeTruthy();
  });
  it('should Get the Light Scheme toggle Button ', () => {
    const {getByTestId} = render(<Togglebutton />);

    expect(getByTestId('toggle-switch')).toBeTruthy();
    const ToggleButton = getByTestId('toggle-switch');
    fireEvent.press(ToggleButton);
    expect(ToggleButton.props.value).toBe(true);
  });
  it('should Get the Light Scheme toggle Button', () => {
    const toggleColorScheme = jest.fn();
    const {getByTestId} = render(
      <ColorSchemeContextMock.Provider
        value={{colorScheme: 'dark', toggleColorScheme}}>
        <Togglebutton />
      </ColorSchemeContextMock.Provider>,
    );

    const toggleSwitch = getByTestId('toggle-switch');
    expect(toggleSwitch).toBeTruthy();
    fireEvent(toggleSwitch, 'onChange', {nativeEvent: {value: false}});
    fireEvent.press(toggleSwitch);
  });
});
