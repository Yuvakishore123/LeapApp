import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import Togglebutton from '../../../src/components/atoms/Colorscheme/Togglebutton';

jest.mock('../../../assets/darkmoon.jpeg', () => 'mocked-darkmoon-image');
jest.mock('../../../assets/sun.png', () => 'mocked-sun-image');
describe('Togglebutton', () => {
  it('renders the component correctly', () => {
    const {getByTestId} = render(<Togglebutton />);
    const toggleContainer = getByTestId('toggle-container');
    const toggleSwitch = getByTestId('toggle-switch');
    expect(toggleContainer).toBeDefined();
    expect(toggleSwitch).toBeDefined();
  });

  it('calls handleToggle function when the switch is toggled', () => {
    const {getByTestId} = render(<Togglebutton />);
    const toggleSwitch = getByTestId('toggle-switch');
    act(() => {
      fireEvent(toggleSwitch, 'valueChange', {target: {value: true}});
    });
  });
  it('should change color', () => {
    const {getByTestId} = render(<Togglebutton />);
    const toggleImage = getByTestId('switch-dark');
    const toggleSwitch = getByTestId('toggle-switch');
    act(() => {
      fireEvent(toggleSwitch, 'valueChange');
    });

    // Assert the color change based on the toggle state
    if (toggleSwitch.props.value === true) {
      expect(toggleImage.props.source).toEqual('mocked-darkmoon-image');
    } else {
      expect(toggleImage.props.source).toEqual('mocked-sun-image');
    }
  });

  it('should render dark mode image', () => {
    const {getByTestId} = render(<Togglebutton />);
    const toggleImage = getByTestId('switch-dark');
    const toggleSwitch = getByTestId('toggle-switch');

    expect(toggleSwitch.props.value).toBe(true);
    expect(toggleImage.props.source).toEqual('mocked-darkmoon-image');
  });

  it('should initialize switchAnim with 0 when colorScheme is dark', () => {
    const {getByTestId} = render(<Togglebutton />);
    const toggleImage = getByTestId('switch-dark');
    const toggleSwitch = getByTestId('toggle-switch');

    expect(toggleSwitch.props.value).toBe(true);
    expect(toggleImage.props.style.transform[0].translateX).toEqual(23);
  });
});
