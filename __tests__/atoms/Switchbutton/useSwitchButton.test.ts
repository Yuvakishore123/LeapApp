import {act, renderHook, waitFor} from '@testing-library/react-native';
import useSwitchButton from '../../../src/components/atoms/switchButton/useSwitchbutton';
import {url} from 'constants/Apis';
import {setRole} from '../../../src/redux/actions/Actions';
import {logMessage} from '../../../src/helpers/Helper';
import ApiService from 'network/Network';
import {useSelector} from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn(),
}));

jest.mock('../../../src/redux/actions/Actions', () => ({
  setRole: jest.fn(),
}));

jest.mock('react-native', () => ({
  Animated: {
    Value: jest.fn(() => ({start: jest.fn()})),
    timing: jest.fn().mockReturnValue({start: jest.fn()}),
  },
}));
jest.mock('../../../src/helpers/Helper', () => ({
  logMessage: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));
jest.mock('network/Network', () => ({
  post: jest.fn(),
}));
jest.mock('@sentry/react-native', () => require('react-native-sentry'));
jest.mock('../../../src/constants/AsyncStorageWrapper', () => ({
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));
describe('useSwitchButton', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        Rolereducer: {role: ''},
      }),
    );
  });
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

    require('network/Network').post.mockResolvedValue(mockResponse);
    const {result} = renderHook(() => useSwitchButton());
    const mockOption = 'BORROWER';
    act(() => {
      result.current.handleOptionPress(mockOption);
    });

    expect(result.current.showOptions).toBe(false);
    waitFor(() => {
      expect(ApiService.post).toHaveBeenCalledWith(
        `${url}/user/switch?profile=${mockOption}`,
        null,
      );
      expect(
        require('constants/AsyncStorageWrapper').removeItem,
      ).toHaveBeenCalledWith('token');
      expect(
        require('constants/AsyncStorageWrapper').setItem,
      ).toHaveBeenCalledWith('token', 'newToken');
      expect(mockDispatch).toHaveBeenCalledWith(setRole(mockOption));
      expect(result.current.accountType).toBe('Borrower'); // Assuming 'setAccountType' updates the 'accountType' state
    });
  });
  it('should handle the handleOptionPress for owner option', async () => {
    const mockResponse = {
      status: 200,
      headers: {
        access_token: 'newToken',
      },
    };

    require('network/Network').post.mockResolvedValue(mockResponse);
    const {result} = renderHook(() => useSwitchButton());
    const mockOption = 'OWNER';
    act(() => {
      result.current.handleOptionPress(mockOption);
    });

    expect(result.current.showOptions).toBe(false);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setRole(mockOption));
      expect(result.current.accountType).toBe('Owner'); // Assuming 'setAccountType' updates the 'accountType' state
    });
  });
  it('should reject the handleOptionPress', () => {
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        Rolereducer: {role: 'BORROWER'},
      }),
    );
    const mockResponse = {
      status: 404,
      headers: {
        access_token: '',
      },
    };

    require('network/Network').post.mockResolvedValue(mockResponse);
    const {result} = renderHook(() => useSwitchButton());
    const mockOption = 'BORROWER';
    act(() => {
      result.current.handleOptionPress(mockOption);
    });

    expect(result.current.showOptions).toBe(false);
    waitFor(() => {
      expect(logMessage.error).toHaveBeenCalledWith(
        'Request failed to switch user',
      );
    });
  });
  it('should reject when post api rejected in the handleOptionPress', () => {
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        Rolereducer: {role: 'OWNER'},
      }),
    );
    const mockResponse = {
      status: 404,
      headers: {
        access_token: '',
      },
    };
    const {result} = renderHook(() => useSwitchButton());
    require('network/Network').post.mockRejectedValue(mockResponse);
    const mockOption = 'BORROWER';
    act(() => {
      result.current.handleOptionPress(mockOption);
    });

    expect(result.current.showOptions).toBe(false);
    waitFor(() => {
      expect(logMessage.error).toHaveBeenCalledWith(
        'Request failed to switch user',
      );
    });
  });
});
