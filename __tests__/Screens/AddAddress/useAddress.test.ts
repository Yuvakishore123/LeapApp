import {renderHook} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import useAddress from 'screens/Owneraddaddress/useAddress';
import {ListAddress} from '../../../src/redux/slice/listAddressSlice';
import {act} from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('../../../src/helpers/helper', () => ({
  useThunkDispatch: () => ({dispatch: mockDispatch}),
}));
// jest.mock('react-test-renderer', () => ({
//   act: jest.fn(),
// }));
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

describe('useAddress', () => {
  beforeEach(() => {
    useSelector.mockImplementation(selector =>
      selector({
        listAddress: {data: {}},
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles useEffect hook correctly', () => {
    // act(() => {
    renderHook(() => useAddress());
    // });

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(mockDispatch).toBeCalledTimes(1);
  });
});
