import {render} from '@testing-library/react-native';
import React from 'react';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import ApiErrorScreen from 'screens/Common/ApiErrorScreen/ApiErrorScreen';

import {StatusCodes} from '../../../../src/utils/statusCodes';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('react-native-razorpay', () => require('razorpay-mock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    messaging: jest.fn(() => ({
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});
describe('Profile Screen', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    useSelector.mockImplementation(selector =>
      selector({
        profileData: {
          data: [],
        },
        Rolereducer: {
          role: '',
        },
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Profile Screen', () => {
    const mockRoute = {
      params: {
        status: StatusCodes.NETWORK_ERROR, // Replace with the desired status code
      },
    };
    const result = render(<ApiErrorScreen route={mockRoute} />);
    expect(result).toBeDefined();
  });
  it('should render not found Screen', () => {
    const mockRoute = {
      params: {
        status: StatusCodes.NOT_FOUND, // Replace with the desired status code
      },
    };
    const {getByTestId, getByText} = render(
      <ApiErrorScreen route={mockRoute} />,
    );
    const errormessage = getByTestId('ErrorMessage');
    const renderedMessage = getByText('Oops! Something went wrong.');
    expect(errormessage).toBeDefined();
    expect(renderedMessage).toBeTruthy();
  });
  it('should render Internal Server Screen', () => {
    const mockRoute = {
      params: {
        status: StatusCodes.INTERNAL_SERVER_ERROR, // Replace with the desired status code
      },
    };
    const {getByTestId, getByText} = render(
      <ApiErrorScreen route={mockRoute} />,
    );
    const errormessage = getByTestId('ErrorMessage');
    const renderedMessage = getByText('Server error. Please try again later.');
    expect(errormessage).toBeDefined();
    expect(renderedMessage).toBeTruthy();
  });
  it('should render Forbidden  Screen', () => {
    const mockRoute = {
      params: {
        status: StatusCodes.FORBIDDEN, // Replace with the desired status code
      },
    };
    const {getByTestId, getByText} = render(
      <ApiErrorScreen route={mockRoute} />,
    );
    const errormessage = getByTestId('ErrorMessage');
    const renderedMessage = getByText('Login Expiry');
    expect(errormessage).toBeDefined();
    expect(renderedMessage).toBeTruthy();
  });
  it('should render Error occured  Screen', () => {
    const mockRoute = {
      params: {
        status: StatusCodes.UNDER_MAINTAINANCE, // Replace with the desired status code
      },
    };
    const {getByTestId, getByText} = render(
      <ApiErrorScreen route={mockRoute} />,
    );
    const errormessage = getByTestId('ErrorMessage');
    const renderedMessage = getByText('An unknown error occurred.');
    expect(errormessage).toBeDefined();
    expect(renderedMessage).toBeTruthy();
  });
});
