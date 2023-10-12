import React from 'react';
import {renderHook} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider, useSelector} from 'react-redux';
import useProfile from 'screens/Profile/useProfile';
import {profileUpload} from 'constants/Apis';
import ApiService from 'network/network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
describe('OwnerProfile', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(
      (
        selector: (arg0: {
          profileData: {data: {}; isLoader: null};
          Rolereducer: any;
        }) => any,
      ) =>
        selector({
          profileData: {data: {}, isLoader: null},
          Rolereducer: {role: null},
        }),
    );
    AsyncStorage.clear();
  });
  jest.mock('../../../src/screens/Ownerprofile/useOwnerProfile', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
      isloading: false, // Set isLoading to false
      profileData: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
    }),
    fetchProfileData: jest.fn(),
  }));
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should handle removing profile picture', async () => {
    const {result} = renderHook(() => useProfile(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    jest.spyOn(ApiService, 'post').mockResolvedValue({ok: true});
    result.current.setProfileImage = jest.fn(); // Mocking setProfileImage

    await result.current.handleRemoveProfilePic();

    expect(jest.spyOn(ApiService, 'post')).toHaveBeenCalledWith(
      `${profileUpload}=${null}`,
      {},
    );
    // Add more assertions as needed
  });
});
