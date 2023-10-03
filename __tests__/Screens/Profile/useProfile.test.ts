/* eslint-disable @typescript-eslint/no-shadow */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook} from '@testing-library/react-native';
import {AxiosResponse} from 'axios';
import {profileUpload} from 'constants/Apis';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import ApiService from 'network/network';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import useProfile from 'screens/Profile/useProfile';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
// jest.mock('react-native-permissions', () => ({
//   request: jest.fn(),
// }));
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));
jest.mock('../../../src/network/network', () => ({
  post: jest.fn(),
}));

jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});

const configureDispatch = () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  return dispatch;
};
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
describe('Profile Screen', () => {
  let mockPost: jest.SpyInstance<
    Promise<AxiosResponse<any, any>>,
    [url: string, body: any],
    any
  >;
  const mockDispatch = configureDispatch();
  beforeEach(() => {
    mockPost = jest.spyOn(ApiService, 'post');
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation(
      (selector: (arg0: {profileData: {data: {}}}) => any) =>
        selector({
          profileData: {data: {}},
        }),
    );
    AsyncStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch profile data', async () => {
    const mockData = {
      firstName: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImageUrl: 'https://example.com/profile.jpg',
    };

    // Mock useSelector to return mockData
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(mockData);

    // Mock useDispatch to return mockDispatch
    jest
      .spyOn(require('../../../src/helpers/helper'), 'useThunkDispatch')
      .mockReturnValue({
        dispatch: mockDispatch,
      });

    // Mock ApiService.post to return a success response
    ApiService.post.mockResolvedValue({
      ok: true,
      json: () => ({url: 'mockImageUrl'}),
    });

    const {result} = renderHook(() => useProfile());

    await act(() => {
      result.current.fetchProfileData();
    });
    // Ensure isLoading is set to false after fetching data
    expect(result.current.isLoading).toBe(false);

    // You can add more assertions based on your expected behavior
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => useProfile());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModall).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useProfile());
    expect(result.current.showModall).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModall).toBe(false);
  });
  it('This should open modall1', () => {
    const wishlist = renderHook(() => useProfile());
    act(() => {
      wishlist.result.current.openModal1();
    });
    expect(wishlist.result.current.showModal1).toBe(true);
  });
  it('This should close  modall1', () => {
    const {result} = renderHook(() => useProfile());
    expect(result.current.showModal1).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal1();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal1).toBe(false);
  });
  it('should call pickImage correctly', async () => {
    const {result} = renderHook(() => useProfile());

    // Mocking the response of launchImageLibrary
    const mockResponse = {didCancel: true, assets: []}; // Adjust the response as needed
    launchImageLibrary.mockResolvedValue(mockResponse);

    // Access pickImage from the hook
    const {pickImage} = result.current;

    // Call the function
    await pickImage();

    // Now you can add your assertions based on the expected behavior
  });
  it('should pick image if permission is granted', async () => {
    const {result} = renderHook(() => useProfile());

    // Mock permission as granted
    asyncStorageWrapper.getItem.mockResolvedValue('true');

    // Mock launchImageLibrary response
    const mockResponse = {didCancel: false, assets: [{uri: 'mockImageUri'}]};
    launchImageLibrary.mockResolvedValue(mockResponse);

    // Access checkPermission from the hook
    const {checkPermission} = result.current;

    // Call the function
    await checkPermission();

    // Add your assertions based on the expected behavior

    // For example, you can check if pickImage has been called
    expect(launchImageLibrary).toHaveBeenCalled();
  });
  it('should upload image and handle response', async () => {
    const imageUrl = 'mockImageUrl';
    mockPost.mockResolvedValue({ok: true});

    const {result} = renderHook(() => useProfile());

    await result.current.uploadImage(imageUrl);

    expect(mockPost).toHaveBeenCalledWith(`${profileUpload}=${imageUrl}`, {});
    // Add more assertions as needed
  });
  it('should handle removing profile picture', async () => {
    const {result} = renderHook(() => useProfile());

    mockPost.mockResolvedValue({ok: true});
    result.current.setProfileImage = jest.fn(); // Mocking setProfileImage

    await result.current.handleRemoveProfilePic();

    expect(mockPost).toHaveBeenCalledWith(`${profileUpload}=${null}`, {});
    // Add more assertions as needed
  });
  it('should set refresh state to true', () => {
    const {result} = renderHook(() => useProfile()); // Replace useYourHook with the actual name of your hook

    // Call the refreshData function
    act(() => {
      result.current.refreshData();
    });

    // Assert that the refresh state is true
    expect(result.current.refreshState).toBe(true);
  });
  it('should handle successful upload result', async () => {
    const {result} = renderHook(() => useProfile());

    const mockResult = new Response(JSON.stringify({url: 'mockImageUrl'}), {
      status: 200,
      headers: {'Content-type': 'application/json'},
    });

    await result.current.handleUploadResult(mockResult);
    expect(result.current.isloading).toBe(false);
    expect(result.current.selectedImage).toBe('mockImageUrl');
  });
});
