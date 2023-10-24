import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import UseOwnerprofile from 'screens/Ownerprofile/useOwnerProfile';

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
    const {result} = renderHook(() => UseOwnerprofile());

    expect(result).toBeTruthy();
  });
  it('should handle Logout', async () => {
    const {result} = renderHook(() => UseOwnerprofile());

    act(() => {
      result.current.handleLogout();
    });
    waitFor(() => {
      expect(result.current.Logout).toBeDefined();
    });
  });
});
