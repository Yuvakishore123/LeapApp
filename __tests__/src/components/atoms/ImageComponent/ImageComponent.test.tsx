import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import ImageComponent from 'components/atoms/ImageComponent/ImageComponent';
import React from 'react';

describe('Image Component', () => {
  it('should render the placeholder component', async () => {
    const {getByTestId} = render(
      <ImageComponent
        imageUrl=""
        imageLoaded={undefined}
        setImageLoaded={undefined}
      />,
    );

    // Check if the placeholder image is initially rendered with the test ID 'placeholder-image'
    const placeholderImage = getByTestId('placeholder-image');
    await waitFor(() => {
      expect(placeholderImage).toBeTruthy();
    });
  });
  it('should render the mainImage component when the image is loaded', async () => {
    const mockSetImageLoaded = jest.fn();

    const {getByTestId} = render(
      <ImageComponent
        imageUrl="some-url"
        imageLoaded={true} // Initially, imageLoaded should be false
        setImageLoaded={mockSetImageLoaded}
      />,
    );

    // Check if the main image is initially rendered with the test ID 'main-image'
    const mainImage = getByTestId('main-image');
    expect(mainImage.props.style).toStrictEqual([
      {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 145,
        width: '100%',
      },
      {display: 'flex'},
    ]);

    // Ensure that the mainImage exists
    expect(mainImage).toBeTruthy();

    // Now, trigger the onLoad event by simulating it
    act(() => {
      fireEvent(mainImage, 'onLoad');
    });

    // Check if the setImageLoaded function was called with true
    expect(mockSetImageLoaded).toHaveBeenCalledWith(true);

    act(() => {
      fireEvent(mainImage, 'onError');
    });
    expect(mockSetImageLoaded).toHaveBeenCalledWith(false);
  });
});
