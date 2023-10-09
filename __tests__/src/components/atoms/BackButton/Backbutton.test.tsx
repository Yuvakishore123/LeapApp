import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BackButton from 'components/atoms/BackButton/BackButton';

describe('BackButton', () => {
  it('should navigate back when the back button is pressed', () => {
    const goBackMock = jest.fn();
    const navigationMock = {goBack: goBackMock};

    const {getByTestId} = render(<BackButton navigation={navigationMock} />);

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(goBackMock).toHaveBeenCalled();
  });
});
