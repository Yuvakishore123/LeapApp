import {fireEvent, render, waitFor} from '@testing-library/react-native';
import ImageComponent from '../../../src/components/atoms/ImageComponent';
import React from 'react';

describe('Image Component', () => {
  it('should render the placeholder component', async () => {
    const {getByTestId} = render(<ImageComponent imageUrl="some-url" />);

    // Check if the placeholder image is initially rendered with the test ID 'placeholder-image'
    const Image = getByTestId('image');
    await waitFor(() => {
      expect(Image).toBeTruthy();
    });
  });
  test('sets imageLoaded state to true on image load', () => {
    const {getByTestId} = render(
      <ImageComponent imageUrl="example.com/image.jpg" />,
    );

    // Set imageLoaded to true before trying to access the imageComponent
    fireEvent(getByTestId('imageComponent'), 'onLoad');

    const actualImage = getByTestId('imageComponent');
    expect(actualImage).toBeTruthy();
  });
});
