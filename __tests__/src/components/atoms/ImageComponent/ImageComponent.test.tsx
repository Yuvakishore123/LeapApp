import {render, waitFor} from '@testing-library/react-native';
import ImageComponent from 'components/atoms/ImageComponent/ImageComponent';
import React from 'react';

describe('Image Component', () => {
  it('should render the placeholder component', async () => {
    const {getByTestId} = render(<ImageComponent imageUrl="some-url" />);

    // Check if the placeholder image is initially rendered with the test ID 'placeholder-image'
    const placeholderImage = getByTestId('placeholder-image');
    await waitFor(() => {
      expect(placeholderImage).toBeTruthy();
    });
  });
});
