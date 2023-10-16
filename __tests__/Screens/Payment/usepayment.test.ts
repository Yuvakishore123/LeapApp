import {renderHook} from '@testing-library/react-native';
import usePayment from '../../../src/screens/PaymentScreens/usePayment';

jest.useFakeTimers(); // Mocks timers
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      reset: jest.fn(),
    }),
  };
});
describe('usePayment', () => {
  it('should reset navigation after 7 seconds', () => {
    const {result, unmount} = renderHook(() => usePayment());

    // Fast-forward time by 7000 milliseconds (7 seconds)
    jest.advanceTimersByTime(7000);

    // Assert that navigation.reset has been called
    expect(result.current.navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'CartScreen', params: {screen: 'Cart'}}],
    });

    // Clean up the timer mock
    unmount();
  });
});
