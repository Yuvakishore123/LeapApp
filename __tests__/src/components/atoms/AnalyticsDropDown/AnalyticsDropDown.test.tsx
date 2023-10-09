import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AnalyticsDropdown from 'components/atoms/AnalyticsDropdown/AnalyticsDropdown';

describe('AnalyticsDropdown', () => {
  test('should call onSelect with selected value when an option is selected', () => {
    const onChangeMock = jest.fn();
    const {getByText} = render(<AnalyticsDropdown onSelect={onChangeMock} />);

    fireEvent.press(getByText('Quantity'));
    fireEvent.press(getByText('Earnings'));

    expect(onChangeMock).toHaveBeenNthCalledWith(1, 'Earnings');

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test('should toggle dropdown visibility when the main container is pressed', () => {
    const {getByTestId} = render(<AnalyticsDropdown onSelect={jest.fn()} />);
    const mainContainer = getByTestId('mainContainer');

    fireEvent.press(mainContainer);

    expect(mainContainer).toBeDefined();
  });
  test('should select the value when touchable button is pressed', () => {
    const {getByTestId, getByText} = render(
      <AnalyticsDropdown onSelect={jest.fn()} />,
    );
    const mainContainer = getByTestId('mainContainer');

    fireEvent.press(mainContainer);

    const quantityButton = getByTestId('Quantity-Container');

    fireEvent.press(quantityButton);
  });
});
