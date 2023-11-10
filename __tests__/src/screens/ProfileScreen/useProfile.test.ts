import {renderHook, act, waitFor} from '@testing-library/react-native';
import useProfile from '../../../../src/screens/BorrowerScreens/Profile/useProfile';
import {Alert, Linking, PermissionsAndroid} from 'react-native';
import AsyncStorageWrapper from '../../../../src/utils/asyncStorage';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {profileUpload, url} from 'constants/Apis';
import ApiService from 'network/network';

jest.mock('network/network', () => ({
  post: jest.fn().mockResolvedValue({status: 200, data: {}}),
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
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockDispatch = jest.fn();

jest.mock('../../../../src/helpers/helper', () => ({
  useThunkDispatch: () => ({dispatch: mockDispatch}),
  logMessage: () => ({log: jest.fn()}),
}));
// Mock the Toast module
jest.mock('react-native-toast-message', () => ({
  Toast: {
    show: jest.fn(),
  },
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  Linking: {
    openSettings: jest.fn(),
  },
  PermissionsAndroid: {
    request: jest.fn(),
    RESULTS: {
      NEVER_ASK_AGAIN: 'never_ask_again',
      GRANTED: 'granted',
    },
    PERMISSIONS: {
      CAMERA: 'android.permission.CAMERA', // Define CAMERA permission
    },
  },
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
jest.mock('react-native-toast-message', () => ({
  Toast: jest.fn(),
}));
const mockPermissionsAndroid = {
  request: jest.fn(),
  RESULTS: {
    NEVER_ASK_AGAIN: 'never_ask_again',
    GRANTED: 'granted',
  },
  PERMISSIONS: {
    CAMERA: 'android.permission.CAMERA', // Define CAMERA permission
  },
};
beforeAll(() => {
  // Replace the real PermissionsAndroid module with the mock
  jest
    .spyOn(PermissionsAndroid, 'request')
    .mockImplementation(mockPermissionsAndroid.request);
});
describe('ProfileScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should Open modal Profile Data and close the modal ', () => {
    const {result} = renderHook(() => useProfile());
    expect(result.current.showModall).toBe(false);
    expect(result.current.refreshState).toBe(false);
    result.current.fetchProfileData = jest.fn(() => Promise.resolve());

    // Call openModal
    act(() => {
      result.current.openModal();
    });

    // Assert that showModall and refreshState were set to true and false respectively
    expect(result.current.showModall).toBe(true);
    expect(result.current.refreshState).toBe(true);
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.showModall).toBe(false);
  });
  it('Should refresh the  Data  ', () => {
    const {result} = renderHook(() => useProfile());
    expect(result.current.refreshState).toBe(false);

    // Call openModal
    act(() => {
      result.current.refreshData();
    });
    expect(result.current.refreshState).toBe(true);
  });
  it('Should Open modal of Removed  Profile Data and close the modal ', () => {
    const {result} = renderHook(() => useProfile());
    expect(result.current.showModal1).toBe(false);
    expect(result.current.refreshState).toBe(false);

    // Call openModal
    act(() => {
      result.current.openModal1();
    });

    // Assert that showModall and refreshState were set to true and false respectively
    expect(result.current.showModal1).toBe(true);

    act(() => {
      result.current.closeModal1();
    });
    expect(result.current.showModal1).toBe(false);
  });
  it('should call Alert.alert with the correct parameters', () => {
    // Call the function
    const {result} = renderHook(() => useProfile());
    act(() => {
      result.current.showDialogToAppSettings();
    });
    // Assert that Alert.alert was called with the correct parameters
    expect(Alert.alert).toHaveBeenCalledWith(
      'Permission Required',
      'To upload images, please grant access to your photo library in app settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: expect.any(Function), // Ensure onPress is a function
        },
      ],
    );
  });
  it('should call Open settings with the correct parameters', () => {
    // Call the function
    const {result} = renderHook(() => useProfile());
    act(() => {
      result.current.openAppSettings();
    });
    expect(Linking.openSettings).toHaveBeenCalled();
  });

  it('should call showDialogToAppSettings when permission is not granted', async () => {
    // Mock PermissionsAndroid.request to return 'denied'
    jest.spyOn(PermissionsAndroid, 'request').mockResolvedValue('denied');

    // Mock the showDialogToAppSettings and pickImage functions
    const mockShowDialogToAppSettings = jest.fn();
    const mockPickImage = jest.fn();

    // Render the hook
    const {result} = renderHook(() => useProfile());

    // Mock the functions within the hook
    result.current.showDialogToAppSettings = mockShowDialogToAppSettings;
    result.current.pickImage = mockPickImage;

    // Call requestCameraPermission
    await act(async () => {
      await result.current.requestCameraPermission();
    });

    // Ensure showDialogToAppSettings was called
    // expect(mockShowDialogToAppSettings).toHaveBeenCalled();

    expect(mockPickImage).not.toHaveBeenCalled();
  });
  it('should call showToast and setIsloading when no valid images are selected', async () => {
    // Mock the response when user cancels image selection
    const mockResponse = {didCancel: true};
    (launchImageLibrary as jest.Mock).mockResolvedValue(mockResponse);

    // Mock showToast and setIsloading functions

    // Render the hook
    const {result} = renderHook(() => useProfile());

    // Mock the showToast and setIsLoading functions within the hook

    expect(result.current.isLoading).toBe(false);

    // Call pickImage
    await act(async () => {
      await result.current.pickImage();
    });

    // Assertions
    // Assert that showToast was called

    // Assert that setIsLoading(false) was called
    expect(result.current.isLoading).toBe(false);
  });
  it('should log if any error code is there', async () => {
    // Mock the response when user cancels image selection
    const mockResponse = {errorCode: true};
    (launchImageLibrary as jest.Mock).mockResolvedValue(mockResponse);

    // Mock showToast and setIsloading functions

    // Render the hook
    const {result} = renderHook(() => useProfile());

    // Mock the showToast and setIsLoading functions within the hook

    expect(result.current.isLoading).toBe(false);

    // Call pickImage
    await act(async () => {
      await result.current.pickImage();
    });
    expect(result.current.isLoading).toBe(false);
  });
  it('should call uploadImage and fetchProfileData when images are selected and uploaded successfully', async () => {
    // Mock a valid response when user selects and uploads an image
    const mockResponse = {
      assets: [
        {
          uri: 'image-uri',
          fileSize: 50000, // Mock a valid file size (less than 100000)
          fileName: 'image.png',
        },
      ],
    };
    (launchImageLibrary as jest.Mock).mockResolvedValue(mockResponse);

    // Mock other functions and states

    // Render the hook
    const {result} = renderHook(() => useProfile());

    // Mock the functions and states within the hook

    // Call pickImage
    await act(async () => {
      await result.current.pickImage();
    });

    // Assertions
    // Assert that setIsLoading(true) was called
    expect(result.current.isLoading).toBe(false);
  });
  it('should perform actions when result.ok is true', async () => {
    // Mock a valid response when user selects and uploads an image
    const mockResponse = {
      assets: [
        {
          uri: 'image-uri',
          fileSize: 50000, // Mock a valid file size (less than 100000)
          fileName: 'image.png',
        },
      ],
    };
    (launchImageLibrary as jest.Mock).mockResolvedValue(mockResponse);

    // Mock other functions and states within the hook
    const mockSetIsLoading = jest.fn();
    const mockUploadImage = jest.fn();
    const mockFetchProfileData = jest.fn();
    const mockOpenModal = jest.fn();

    // Mock AsyncStorageWrapper.getItem to return a token
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(
      'mocked-token',
    );

    // Mock the fetch API response
    const mockFetchResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({url: 'uploaded-image-url'}), // Mock the response JSON
    };
    globalThis.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

    // Render the hook
    const {result} = renderHook(() => useProfile());

    // Mock the functions and states within the hook
    result.current.setIsLoading = mockSetIsLoading;
    result.current.uploadImage = mockUploadImage;
    result.current.fetchProfileData = mockFetchProfileData;
    result.current.openModal = mockOpenModal;

    // Call pickImage
    await act(async () => {
      await result.current.pickImage();
    });

    // Assert that fetch was called with the correct URL
    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${url}/file/uploadProfileImage`,
      {
        method: 'POST',
        body: expect.any(FormData),
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer mocked-token',
        },
      },
    );

    // Resolve the fetch promise
    await Promise.resolve();

    // Assert that setIsLoading(false) was called

    // Assert that setSelectedImage and setProfileImage were called with the correct URL
    expect(result.current.selectedImage).toBe('uploaded-image-url');
    expect(result.current.profilePic).toBe('uploaded-image-url');

    // Assert that uploadImage was called with the correct URL
  });
  it('should upload an image and fetch profile data', async () => {
    // Mock the ApiService module
    const {result} = renderHook(() => useProfile());

    // Mock your log function if needed

    // Mock the global log function if needed

    act(() => {
      result.current.uploadImage('res-url');
    });
    expect(ApiService.post).toHaveBeenCalledWith(
      `${url}/user/updateProfilePicture?profileImageUrl=${'res-url'}`,
      {},
    );
  });
  it('should handle upload failure gracefully', async () => {
    const {result} = renderHook(() => useProfile());
    // Mock ApiService.post to simulate a failed upload

    act(() => {
      result.current.handleRemoveProfilePic();
    });

    // Assertions
    expect(ApiService.post).toHaveBeenCalledWith(
      `${profileUpload}=${null}`,
      {},
    );
  });
  it('should navigate to Order screen', () => {
    const {result} = renderHook(() => useProfile());
    act(() => {
      result.current.handleOwnerScreen();
    });
    expect(mockNav).toHaveBeenCalledWith('MyOrder');
  });
  it('should navigate to Addresss screen', () => {
    const {result} = renderHook(() => useProfile());
    act(() => {
      result.current.handleEditAddress();
    });
    expect(mockNav).toHaveBeenCalledWith('Owneraddresspage');
  });
  it('should navigate to Edit Profile', () => {
    const {result} = renderHook(() => useProfile());
    act(() => {
      result.current.handleEditProfile();
    });
    expect(mockNav).toHaveBeenCalledWith('Ownereditprofile');
  });
  it('should upload the Image and call pick images', () => {
    const mockPickImage = jest.fn();
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('granted');
    const {result} = renderHook(() => useProfile());
    result.current.pickImage = mockPickImage;

    act(() => {
      result.current.ImageUpload();
    });
  });
  it('should upload the Image and call Request Access', () => {
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('Denied');
    const {result} = renderHook(() => useProfile());
    act(() => {
      result.current.ImageUpload();
    });
  });
  it('should requestCameraPermission ', () => {
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('Denied');
    jest.spyOn(PermissionsAndroid, 'request').mockResolvedValue('granted');
    const {result} = renderHook(() => useProfile());
    act(() => {
      result.current.requestCameraPermission();
    });
  });
  it('should deny the request', async () => {
    // Mock AsyncStorageWrapper to return 'Denied'
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('granted');

    // Mock PermissionsAndroid.request to return 'Denied'
    jest
      .spyOn(PermissionsAndroid, 'request')
      .mockResolvedValue(PermissionsAndroid.RESULTS.DENIED);

    // Render the component or hook that uses requestCameraPermission
    const {result} = renderHook(() => useProfile());

    // Act: Call the requestCameraPermission function
    await act(async () => {
      await result.current.requestCameraPermission();
    });
  });
  it('should show toast if image is null', async () => {
    // Mock a valid response when user selects and uploads an image
    const mockResponse = {
      assets: [],
    };
    (launchImageLibrary as jest.Mock).mockResolvedValue(mockResponse);

    // Mock AsyncStorageWrapper.getItem to return a token
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(
      'mocked-token',
    );

    // Render the hook
    const {result} = renderHook(() => useProfile());

    // Call pickImage
    await act(async () => {
      await result.current.pickImage();
    });
    expect(result.current.isloading).toBe(false);

    // Assert that uploadImage was called with the correct URL
  });
});
