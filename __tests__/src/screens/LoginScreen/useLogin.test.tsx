import {act, renderHook} from '@testing-library/react-native';
import analytics from '@react-native-firebase/analytics';
import useLoginscreen from 'screens/LoginScreen/useLoginscreen';
import AsyncStorageWrapper from '../../../../src/utils/asyncStorage';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import {firebase} from '@react-native-firebase/messaging';
import {logMessage} from 'helpers/helper';
jest.mock('../../../../src/utils/asyncStorage');
jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);

jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-firebase/messaging', () => {
  return {
    messaging: jest.fn(() => ({
      requestPermission: jest.fn(),
      getToken: jest.fn(),
    })),
  };
});

jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../../src/utils/asyncStorage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
    // Add any other methods you need to mock here
  };
});

jest.mock('@react-native-firebase/analytics', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    logEvent: jest.fn(),
  };
});

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

describe('Use Login Screens', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    useSelector.mockImplementation(selector =>
      selector({
        UserProducts: {data: [], firstCallLoading: false},
        login: {data: []},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the use Login', () => {
    const {result} = renderHook(() => useLoginscreen());
    expect(result).toBeDefined();
  });
  it('should store fcm Token during login', async () => {
    // Mock the AsyncStorage getItem and setItem functions
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorageWrapper.setItem as jest.Mock).mockResolvedValue(null);

    const mockToken = 'newToken';

    // Render the hook
    const {result} = renderHook(() => useLoginscreen());

    // Trigger the onTokenRefresh function
    await act(async () => {
      result.current.onTokenRefresh(mockToken);
    });

    // Verify that getItem and setItem were called with the correct arguments
    expect(AsyncStorageWrapper.getItem).toHaveBeenCalledWith('fcmToken');
    expect(AsyncStorageWrapper.setItem).toHaveBeenCalledWith(
      'fcmToken',
      mockToken,
    );
  });
  it('should throw error fcm Token during login', async () => {
    // Mock the AsyncStorageWrapper getItem function to throw an error
    (AsyncStorageWrapper.getItem as jest.Mock).mockRejectedValue(
      new Error('AsyncStorage error'),
    );

    const mockToken = 'newToken';

    // Render the hook
    const {result} = renderHook(() => useLoginscreen());

    // Trigger the onTokenRefresh function
    await act(async () => {
      result.current.onTokenRefresh(mockToken);
    });

    // Verify that getItem and setItem were called with the correct arguments
    expect(AsyncStorageWrapper.getItem).toHaveBeenCalledWith('fcmToken');
    expect(AsyncStorageWrapper.setItem).not.toHaveBeenCalled(); // Ensure setItem is not called
  });
  it('should store fcm Token  login', async () => {
    // Mock the AsyncStorage getItem and setItem functions
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorageWrapper.setItem as jest.Mock).mockResolvedValue(null);

    const mockToken = 'newToken';

    // Render the hook
    const {result} = renderHook(() => useLoginscreen());

    // Trigger the onTokenRefresh function
    await act(async () => {
      result.current.storeFCMToken(mockToken);
    });

    expect(AsyncStorageWrapper.setItem).toHaveBeenCalledWith(
      'fcmToken',
      mockToken,
    );
  });

  it('should show modal when incorrect details are given', async () => {
    const isError = 401;
    // Render the hook
    const {result} = renderHook(() => useLoginscreen());

    // Trigger the onTokenRefresh function
    await act(async () => {
      result.current.handleErrorResponse(isError);
    });
    expect(result.current.showModal).toBe(true);
  });
  it('should navigate to ApiError Screen when response is 404', async () => {
    const isError = 404;
    // Render the hook
    const {result} = renderHook(() => useLoginscreen());

    // Trigger the onTokenRefresh function
    await act(async () => {
      result.current.handleErrorResponse(isError);
    });
    expect(mockNav).toHaveBeenCalledWith('ApiErrorScreen', {status: 404});
  });
  it('should dispatch post Login', () => {
    (AsyncStorageWrapper.setItem as jest.Mock).mockResolvedValue('fcmToken');
    const credentials = {
      email: 'mocked_email@example.com',
      password: 'mocked_password',
      deviceToken: 'mocked_device_token',
    };

    const {result} = renderHook(() => useLoginscreen());

    // Verify that Firebase initialization was called
    act(() => {
      result.current.handleLoginScreen(); // You need to call the initialization function
    });
  });
  it('should request permission from the Firebase', async () => {
    const {result} = renderHook(() => useLoginscreen());

    // Verify that Firebase initialization was called
    act(() => {
      result.current.requestFCMPermission(); // You need to call the initialization function
    });
    (AsyncStorageWrapper.setItem as jest.Mock).mockResolvedValue('fcmToken');
  });
  it('should handle Messsages backGround messages', async () => {
    const {result} = renderHook(() => useLoginscreen());
    const message = 'mesage recieved';

    // Verify that Firebase initialization was called
    act(() => {
      result.current.backgroundMessageHandler(message); // You need to call the initialization function
    });
  });
  it('should remove if not getting', async () => {
    // Mock the AsyncStorage getItem and setItem functions
    (AsyncStorageWrapper.getItem as jest.Mock).mockRejectedValue(null);
    (AsyncStorageWrapper.setItem as jest.Mock).mockRejectedValue(null);

    const mockToken = '';

    // Render the hook
    const {result} = renderHook(() => useLoginscreen());

    // Trigger the onTokenRefresh function
    await act(async () => {
      result.current.storeFCMToken(mockToken);
    });

    expect(AsyncStorageWrapper.setItem).toHaveBeenCalledWith(
      'fcmToken',
      mockToken,
    );
  });
});
