import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import OwnerEditProfile, {
  SkeletonLoader,
} from 'screens/Ownereditprofile/OwnerEditProfile';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import OwnerEditProfileCustomHook from 'screens/Ownereditprofile/useOwnerProfile';
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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
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
jest.mock('screens/Ownereditprofile/useOwnerProfile', () => ({
  isLoading: false,
  closeModal: jest.fn(),
  showModal: jest.fn(),
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  setFirstName: jest.fn(),
  setlastName: jest.fn(),
  setEmail: jest.fn(),
  setPhoneNumber: jest.fn(),
  handleUpdate: jest.fn(),
  isFormValid: true,
  setIsFormValid: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));

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
describe('OwnerEditProfile Screen', () => {
  const mockData = {
    firstName: 'John Doe',
    lastName: 'Kishore Yuva',
    email: 'johndoe@example.com',
    profileImageUrl: 'url-1',
    phoneNumber: '123-456-7890',
  };
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      OwnerEditProfileCustomHook: jest.fn(() => ({
        isLoading: false,
        closeModal: jest.fn(),
        showModal: jest.fn(),
        firstName: '',
        lastName: '',
        email: mockData.email,
        phoneNumber: mockData.phoneNumber,
        setFirstName: jest.fn(),
        setlastName: jest.fn(),
        setEmail: jest.fn(),
        setPhoneNumber: jest.fn(),
        handleUpdate: jest.fn(),
        setIsFormValid: jest.fn(),
        isFormValid: true,
      })),
    });

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
  it('should render the OwnerEditProfile Screen', () => {
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      setIsFormValid: jest.fn(),
    });
    const result = render(<OwnerEditProfile />);

    expect(result).toBeDefined();
  });
  it('should render the loadingComponent Screen', () => {
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const result = render(<SkeletonLoader />);

    expect(result).toBeDefined();
  });
  it('should render the first name textInput', () => {
    const mockSetFirstName = jest.fn();
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      isLoading: false,
      firstName: mockData.firstName,
      setFirstName: mockSetFirstName,
      setIsFormValid: jest.fn(),
    });

    const {getByTestId, getByText} = render(<OwnerEditProfile />);
    const firstname = getByText('First name');

    expect(firstname).toBeDefined();
    const FirstNameinput = getByTestId('firstname');
    fireEvent.changeText(FirstNameinput, mockData.firstName);
    expect(mockSetFirstName).toHaveBeenCalledWith(mockData.firstName);
  });
  it('should render the LastName textInput', () => {
    const mockSetlastName = jest.fn();
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      isLoading: false,
      lastName: mockData.lastName,
      setLastName: mockSetlastName,
      email: mockData.email,
      phoneNumber: mockData.phoneNumber,
      setIsFormValid: jest.fn(),
    });

    const {getByTestId, getByText} = render(<OwnerEditProfile />);
    const firstname = getByText('Last name');

    expect(firstname).toBeDefined();
    const FirstNameinput = getByTestId('lastName');
    fireEvent.changeText(FirstNameinput, mockData.lastName);
    expect(mockSetlastName).toHaveBeenCalledWith(mockData.lastName);
  });
  it('should render the loading Component Screen', () => {
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      isLoading: true,
      setIsFormValid: jest.fn(),
    });

    const result = render(<OwnerEditProfile />);

    expect(result).toBeDefined();
  });
  it('should  check if the form is valid or not', () => {
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      isLoading: false,
      isFormValid: true,
      setIsFormValid: jest.fn(),
    });

    const {getByTestId} = render(<OwnerEditProfile />);
    const disableButton = getByTestId('button-Disable');

    expect(disableButton).toBeDefined();
    expect(disableButton.props.style).toStrictEqual([
      {
        alignItems: 'center',
        backgroundColor: '#9747FF',
        borderRadius: 100,
        height: 59,
        marginLeft: 28,
        top: 40,
        width: '85%',
      },
      {opacity: 1},
    ]);
  });
  it('should update and check if the form is valid or not', () => {
    const mockhandleUpdate = jest.fn();
    (OwnerEditProfileCustomHook as jest.Mock).mockReturnValue({
      isLoading: false,
      isFormValid: true,
      setIsFormValid: jest.fn(),
      handleUpdate: mockhandleUpdate,
    });

    const {getByTestId} = render(<OwnerEditProfile />);
    const disableButton = getByTestId('update-button');

    expect(disableButton).toBeDefined();
    fireEvent.press(disableButton);
    expect(mockhandleUpdate).toBeCalled();
  });
});
