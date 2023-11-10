import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import Carousal from 'screens/BorrowerScreens/Home/Carousal';

jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock the react-native-skeleton-placeholder package
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
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

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe('Corrousal', () => {
  const mockData = [
    {
      id: 1,
      imageUrl: 'https://example.com/image1.jpg',
      categoryName: 'Category 1',
    },
    {
      id: 2,
      imageUrl: 'https://example.com/image2.jpg',
      categoryName: 'Category 2',
    },
    {
      id: 3,
      imageUrl: 'https://example.com/image3.jpg',
      categoryName: 'Category 3',
    },
  ];

  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {
          data: [],
        },
        UserProducts: {
          data: [],
        },
        WishlistProducts: {
          data: [],
        },
        category: {
          data: mockData,
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render Corousal in Home Screen', () => {
    const result = render(<Carousal />);
    expect(result).toBeDefined();
  });
  it('should get the subcategoryData', () => {
    const {getByTestId} = render(<Carousal />);
    const cardComponent = getByTestId('card_component-1');
    expect(cardComponent).toBeDefined();
    fireEvent.press(cardComponent);
    expect(mockNav).toHaveBeenCalledWith('Subcategory', {
      categoryId: 1,
    });
  });
  it('should get the empty text', () => {
    useSelector.mockImplementation(selector =>
      selector({
        category: {
          data: [],
        },
      }),
    );
    const {getByText} = render(<Carousal />);
    const emptyText = getByText('No subcategories found.');
    expect(emptyText).toBeDefined();
  });
});
