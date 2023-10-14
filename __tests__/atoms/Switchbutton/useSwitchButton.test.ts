import {act, renderHook, waitFor} from '@testing-library/react-native';
import useSwitchButton from '../../../src/components/atoms/switchButton/useSwitchbutton';
import {url} from 'constants/Apis';
import {setRole} from '../../../src/redux/actions/actions';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn(),
}));

jest.mock('../../../src/redux/actions/actions', () => ({
  setRole: jest.fn(),
}));

jest.mock('react-native', () => ({
  Animated: {
    Value: jest.fn(() => ({start: jest.fn()})),
    timing: jest.fn().mockReturnValue({start: jest.fn()}),
  },
}));

jest.mock('network/network', () => ({
  post: jest.fn(),
}));
jest.mock('@sentry/react-native', () => require('react-native-sentry'));
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));
describe('useSwitchButton', () => {
  it('should toggle options visibility and animate button/options', () => {
    const {result} = renderHook(() => useSwitchButton());

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.showOptions).toBe(true);
  });
  it('should handle the handlePress', () => {
    const {result} = renderHook(() => useSwitchButton());

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.showOptions).toBe(true);
  });
  it('should handle the handleOptionPress', () => {
    const mockResponse = {
      status: 200,
      headers: {
        access_token: 'newToken',
      },
    };

    require('network/network').post.mockResolvedValue(mockResponse);
    const {result} = renderHook(() => useSwitchButton());
    const mockOption = 'BORROWER';
    act(() => {
      result.current.handleOptionPress(mockOption);
    });

    expect(result.current.showOptions).toBe(false);
    waitFor(() => {
      expect(require('network/network').post).toHaveBeenCalledWith(
        `${url}/user/switch?profile=${mockOption}`,
        null,
      );
      expect(
        require('constants/asyncStorageWrapper').removeItem,
      ).toHaveBeenCalledWith('token');
      expect(
        require('constants/asyncStorageWrapper').setItem,
      ).toHaveBeenCalledWith('token', 'newToken');
      expect(mockDispatch).toHaveBeenCalledWith(setRole(mockOption));
      expect(result.current.accountType).toBe('BORROWER'); // Assuming 'setAccountType' updates the 'accountType' state
    });
  });
  it('should reject the handleOptionPress', () => {
    const mockResponse = {
      status: 404,
      headers: {
        access_token: '',
      },
    };

    require('network/network').post.mockRejectedValue(mockResponse);
    const {result} = renderHook(() => useSwitchButton());
    const mockOption = 'BORROWER';
    act(() => {
      result.current.handleOptionPress(mockOption);
    });

    expect(result.current.showOptions).toBe(false);
    waitFor(() => {
      expect(require('network/network').post).not.toHaveBeenCalledWith(
        `${url}/user/switch?profile=${mockOption}`,
        null,
      );
    });
  });
});
