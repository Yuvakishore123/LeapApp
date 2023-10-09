import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import {boolean} from 'yup';
import Toast from 'react-native-toast-message';
import OwnerEditProfileCustomHook from '../../../../src/screens/Ownereditprofile/useOwnerProfile';
import {updateProfile} from '../../../../src/redux/slice/editProfileSlice';

jest.mock('@notifee/react-native', () => require('notifee-mocks'));
const mockNav = jest.fn();
jest.mock('network/network');
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
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
describe('useCheckout', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {data: []},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open the modal when openmodal is clicked clicked', async () => {
    const {result} = renderHook(() => OwnerEditProfileCustomHook());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.openModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(true);
    });
  });
  it('should close the modal when closeModal is clicked', async () => {
    const {result} = renderHook(() => OwnerEditProfileCustomHook());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.closeModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(false);
    });
  });
  it('should update the data when update is clicked', async () => {
    const {result} = renderHook(() => OwnerEditProfileCustomHook());
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
    };

    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.handleUpdate();
    });
    // expect(mockDispatch).toHaveBeenCalledWith(updateProfile(data));
    expect(mockDispatch).toBeCalled();
    await waitFor(() => {
      expect(result.current.showModal).toBe(true);
    });
  });
});
