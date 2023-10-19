import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook} from '@testing-library/react-native';
import {logMessage} from '../../../src/helpers/helper';
import {useDispatch, useSelector} from 'react-redux';
import useOwnerEditProfileCustomHook from 'screens/Ownereditprofile/useOwnerEditProfileCustomHook';

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
jest.mock('../../../src/helpers/helper', () => ({
  logMessage: {
    error: jest.fn(),
  },
}));
jest.mock('../../../src/redux/slice/editProfileSlice', () => ({
  updateProfile: jest.fn(),
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
describe('useOwnerEditprofile', () => {
  const mockDispatch = configureDispatch();
  jest.mock(
    '../../../src/screens/Ownereditprofile/useOwnerEditProfileCustomHook',
    () => () => ({
      firstName: 'John',
      setFirstName: jest.fn(),
      lastName: 'Doe',
      setLastName: jest.fn(),
      email: 'john.doe@example.com',
      showModal: false,
      closeModal: jest.fn(),
      setEmail: jest.fn(),
      phoneNumber: '1234567890',
      setPhoneNumber: jest.fn(),
      handleUpdate: jest.fn(),
      isLoading: false,
    }),
  );
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation(
      (selector: (arg0: {profileData: {data: {}}}) => any) =>
        selector({
          profileData: {data: {}},
        }),
    );
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should set firstName and lastName correctly', () => {
    const {result} = renderHook(() => useOwnerEditProfileCustomHook());

    act(() => {
      result.current.setFirstName('John');
      result.current.setLastName('Doe');
    });

    expect(result.current.firstName).toBe('John');
    expect(result.current.lastName).toBe('Doe');
  });
  it('should update email and phoneNumber correctly', () => {
    const {result} = renderHook(() => useOwnerEditProfileCustomHook());

    act(() => {
      result.current.setEmail('john.doe@example.com');
      result.current.setPhoneNumber('1234567890');
    });

    expect(result.current.email).toBe('john.doe@example.com');
    expect(result.current.phoneNumber).toBe('1234567890');
  });
  it('should handleUpdate correctly', async () => {
    const {result} = renderHook(() => useOwnerEditProfileCustomHook());

    await act(async () => {
      await result.current.handleUpdate();
    });
    expect(mockDispatch).toBeCalledTimes(3);
    expect(result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useOwnerEditProfileCustomHook());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
});
