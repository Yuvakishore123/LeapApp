import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ApiErrorScreen, {
  RootStackParamList,
} from '../../../src/screens/ApiErrorScreen/ApiErrorScreen';

describe('ApiErrorScreen', () => {
  it('renders correctly with a status code', () => {
    const route = {params: {status: 404}} as RootStackParamList; // Define a sample status code for testing
    const {getByText} = render(<ApiErrorScreen route={route} />);

    // Check if the error message contains the status code
    expect(getByText('Oops! Something went wrong. 404 error')).toBeTruthy();

    // Check if the "Retry" button is rendered
    expect(getByText('Retry')).toBeTruthy();
  });

  it('renders correctly with null status code', () => {
    const route = {params: {status: null}} as RootStackParamList;
    const {getByText, queryByText} = render(<ApiErrorScreen route={route} />);

    // Check if the network error message is rendered
    expect(getByText('Please check your network connection')).toBeTruthy();
    expect(queryByText('Retry')).toBeNull();
  });

  it('handles retry button click', () => {
    const route = {params: {status: 404}} as RootStackParamList;
    const {getByText} = render(<ApiErrorScreen route={route} />);

    // Simulate a button click
    fireEvent.press(getByText('Retry'));

    // Add additional assertions if there are specific behaviors after the retry button is clicked
  });
});
