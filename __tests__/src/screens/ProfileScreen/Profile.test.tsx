import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import Profile from 'screens/Profile/Profile';
import useProfile from 'screens/Profile/useProfile';

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
jest.mock('screens/Profile/useProfile', () => ({
  isloading: false,
  ImageUpload: jest.fn(),
  showModall: jest.fn(),
  closeModal: jest.fn(),
  showModal1: jest.fn(),
  closeModal1: jest.fn(),
  loading: false,
  handleRemoveProfilePic: jest.fn(),
  refreshData: jest.fn(),
  refreshState: jest.fn(),
  data: {},
  handleEditAddress: jest.fn(),
  handleOwnerScreen: jest.fn(),
  handleEditProfile: jest.fn(),
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
describe('Profile Screen', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  const mockData = {
    firstName: 'John Doe',
    email: 'johndoe@example.com',
    profileImageUrl: 'url-1',
    phoneNumber: '123-456-7890',
  };

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useProfile as jest.Mock).mockReturnValue({
      useProfile: jest.fn(() => ({
        isloading: false,
        ImageUpload: jest.fn(),
        showModall: jest.fn(),
        closeModal: jest.fn(),
        showModal1: jest.fn(),
        closeModal1: jest.fn(),
        loading: false,
        handleRemoveProfilePic: jest.fn(),
        refreshData: jest.fn(),
        refreshState: jest.fn(),
        data: [],
        handleEditAddress: jest.fn(),
        handleOwnerScreen: jest.fn(),
        handleEditProfile: jest.fn(),
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

  it('should render the Profile Screen', () => {
    const result = render(<Profile />);
    expect(result).toBeDefined();
  });
  it('should render the Loading ', () => {
    (useProfile as jest.Mock).mockReturnValue({
      isloading: true,
    });
    const {getByTestId} = render(<Profile />);
    const loadingComponent = getByTestId('activity-indicator');
    expect(loadingComponent).toBeDefined();
  });
  it('should render the Skeleton Loading ', () => {
    (useProfile as jest.Mock).mockReturnValue({
      loading: true,
      isloading: true,
    });
    const {getByTestId} = render(<Profile />);
    const loadingComponent = getByTestId('activity-indicator');
    expect(loadingComponent).toBeTruthy();
  });
  it('should delete the Image ', () => {
    const mockRemove = jest.fn();
    (useProfile as jest.Mock).mockReturnValue({
      handleRemoveProfilePic: mockRemove,
      isloading: false,
    });
    const {getByTestId} = render(<Profile />);
    const RemoveButton = getByTestId('Remove-Button');
    expect(RemoveButton).toBeDefined();
    fireEvent.press(RemoveButton);
    expect(mockRemove).toHaveBeenCalled();
  });
  it('should Signout when Signout is Clicked ', () => {
    const mockRemove = jest.fn();
    (useProfile as jest.Mock).mockReturnValue({
      handleRemoveProfilePic: mockRemove,
      isloading: false,
    });
    const {getByTestId} = render(<Profile />);
    const signoutButton = getByTestId('SignOut-Button');
    expect(signoutButton).toBeDefined();
    fireEvent.press(signoutButton);
    expect(dispatchMock).toHaveBeenCalled();
  });
  it('should get the uploaded image the Image ', () => {
    (useProfile as jest.Mock).mockReturnValue({
      isloading: false,
      data: mockData,
    });
    const {getByTestId} = render(<Profile />);
    const ImageComponent = getByTestId('avatar-container');
    expect(ImageComponent).toBeTruthy();
  });
});
