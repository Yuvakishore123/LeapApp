import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import OwnerProfile, {
  SkeletonLoader,
} from 'screens/OwnerScreens/Ownerprofile/OwnerProfile';
import UseOwnerprofile from 'screens/OwnerScreens/Ownerprofile/useOwnerProfile';
import ProfileData from 'screens/BorrowerScreens/Profile/useProfile';

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
jest.mock('screens/BorrowerScreens/Profile/useProfile', () => ({
  isloading: false,
  data: [],
  handleLogout: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('screens/OwnerScreens/Ownerprofile/useOwnerProfile', () => ({
  loading: false,
  data: [],
  handleLogout: jest.fn(),
  default: jest.fn(),
  __esModule: true,
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
describe('OwnerProfile Screen', () => {
  const mockData = {
    profileImageUrl: 'https://example.com/profile.jpg',
    firstName: 'John',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
  };

  const dispatchMock = jest.fn(); // Create a mock function

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (ProfileData as jest.Mock).mockReturnValue({
      ProfileData: jest.fn(() => ({
        isloading: false,
        data: [],
        handleLogout: jest.fn(),
      })),
    });
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      UseOwnerprofile: jest.fn(() => ({
        isloading: false,
        data: [],
        handleLogout: jest.fn(),
      })),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the OwnerProfile Screen', () => {
    // Define a mock route with the necessary params
    const ownerProfile = render(<OwnerProfile />);
    expect(ownerProfile).toBeDefined();
  });
  it('should render the loading Screen', () => {
    (ProfileData as jest.Mock).mockReturnValue({
      isloading: true,
      data: mockData,
    });

    const {getByTestId} = render(<OwnerProfile />);
    const loadingComponent = getByTestId('activity-indicator');
    expect(loadingComponent).toBeDefined();
  });
  it('should render the Image after uploading', () => {
    (ProfileData as jest.Mock).mockReturnValue({
      isloading: false,
    });
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: false,
      data: [],
      handleLogout: jest.fn(),
    });

    const {getByTestId} = render(<OwnerProfile />);
    const ImageComponent = getByTestId('profile-image');
    expect(ImageComponent).toBeDefined();
  });
  it('should render the data ', () => {
    (ProfileData as jest.Mock).mockReturnValue({
      isloading: false,
    });
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: false,
      data: mockData,
      handleLogout: jest.fn(),
    });

    const {getByText, getByTestId} = render(<OwnerProfile />);
    const ImageComponent = getByTestId('Image-container');
    expect(ImageComponent).toBeDefined();
    const Name = getByText('John');
    expect(Name).toBeDefined();
  });
  it('should call the handle profile pic function the data ', () => {
    const mockProfilepic = jest.fn();
    (ProfileData as jest.Mock).mockReturnValue({
      isloading: false,
      handleRemoveProfilePic: mockProfilepic,
    });
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: false,
      data: mockData,
      handleLogout: jest.fn(),
    });

    const {getByText} = render(<OwnerProfile />);
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);
    expect(mockProfilepic).toHaveBeenCalled();
  });
  it('should navigate to particula screens  ', () => {
    const mockProfilepic = jest.fn();
    (ProfileData as jest.Mock).mockReturnValue({
      isloading: false,
      handleRemoveProfilePic: mockProfilepic,
    });
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: false,
      data: mockData,
      handleLogout: jest.fn(),
    });

    const {getByText} = render(<OwnerProfile />);
    const AddressButton = getByText('Address');
    fireEvent.press(AddressButton);
    expect(mockNav).toHaveBeenCalledWith('Owneraddresspage');
    const EditProfile = getByText('Edit Profile');
    fireEvent.press(EditProfile);
    expect(mockNav).toHaveBeenCalledWith('OwnerEditProfile');
    const editItems = getByText('My Products');
    fireEvent.press(editItems);
    expect(mockNav).toHaveBeenCalledWith('Owneredititems');
  });
  it('should render the SkeletonLoader Screen', () => {
    (ProfileData as jest.Mock).mockReturnValue({
      isloading: true,
      data: mockData,
    });
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: true,
      data: mockData,
      handleLogout: jest.fn(),
    });

    const {getByTestId} = render(<SkeletonLoader />);
    const loadingComponent = getByTestId('skeleton-loader');
    expect(loadingComponent).toBeDefined();
  });
  it('should render the Loading Component Screen', () => {
    (ProfileData as jest.Mock).mockReturnValue({
      isloading: true,
      data: mockData,
    });
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: true,
      data: mockData,
      handleLogout: jest.fn(),
    });

    const {getByTestId} = render(<OwnerProfile />);
    const loadingComponent = getByTestId('skeleton-loader');
    expect(loadingComponent).toBeDefined();
  });
});
