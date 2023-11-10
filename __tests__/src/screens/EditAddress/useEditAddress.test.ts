import {renderHook, act} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import uesEditAddress from '../../../../src/screens/Common/EditAddress/useEditAddress';

const mockNav = jest.fn();
const mockGoback = jest.fn();
const mockRoute = {
  params: {
    address: {},
  },
};

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockGoback,
    }),
    useRoute: () => mockRoute, // Mock useRoute to provide a route object
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

describe('UseEdit address', () => {
  const dispatchMock = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  useSelector.mockImplementation(selector =>
    selector({
      editAddressData: {data: {}},
    }),
  );
  it(' This shoulld open the modal', () => {
    const {result} = renderHook(() => uesEditAddress());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModal).toBe(true);
  });
  it(' This shoulld close the modal', () => {
    const {result} = renderHook(() => uesEditAddress());

    act(() => {
      result.current.closeModal();
    });
    expect(mockGoback).toHaveBeenCalled();
  });
  it(' This should change the Option', () => {
    const {result} = renderHook(() => uesEditAddress());

    act(() => {
      result.current.handleOptionChange('Home');
    });

    expect(result.current.selectedOption).toBe('Home');
  });
  it(' This should change the Postal code', () => {
    const {result} = renderHook(() => uesEditAddress());

    act(() => {
      result.current.handlePostalcode('21312');
    });

    expect(result.current.postalCode).toBe('21312');
  });
  it(' This should change the checkbox ', () => {
    const {result} = renderHook(() => uesEditAddress());
    expect(result.current.isChecked).toBe(false);

    act(() => {
      result.current.handleCheckboxChange();
    });

    expect(result.current.isChecked).toBe(true);
  });
  it(' This should dispatch the edit Address ', () => {
    const {result} = renderHook(() => uesEditAddress());
    const updateaddress = {
      addressLine1: '123 Main St',
      addressLine2: '',
      selectedOption: 'Home',
      city: 'Cityville',
      country: 'USA',
      postalCode: '12345',
      state: 'CA',
      defaultType: true,
    };
    const mockAddressId = 1;

    act(() => {
      result.current.handleUpdateAddress();
    });

    expect(dispatchMock).toHaveBeenCalled();
  });
});
