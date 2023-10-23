import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import useCategory from 'screens/Category/useCategory';

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
  (useDispatch as jest.Mock).mockReturnValue(dispatch);
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
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (arg0: {category: {data: {}; loading: boolean}}) => any) =>
        selector({
          category: {data: {}, loading: false},
        }),
    );
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should navigate to Subcategory and dispatch getsubcategoryData', () => {
    const {result} = renderHook(() => useCategory());

    // Mock categoryId
    const categoryId = '123';

    // Call the handleCategoryData function
    result.current.handleCategoryData(categoryId);

    // Check if navigation.navigate is called correctly
    expect(mockNav).toHaveBeenCalledWith('Subcategory', {categoryId});

    // Check if dispatch is called with the correct action and payload
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
