import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import Additems from 'screens/Additems/Additems';
import useAdditems from 'screens/Additems/useAdditems';
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

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
    }),
  };
});
jest.mock('screens/Additems/useAdditems', () => ({
  name: '',
  description: '',
  setGender: jest.fn(),
  setEventType: jest.fn(),
  setOutfitType: jest.fn(),
  setItemType: jest.fn(),
  handleGenderChange: jest.fn(),
  handleEventTypeChange: jest.fn(),
  handleOutfitChange: jest.fn(),
  handleItemTypeChange: jest.fn(),
  handleItems: jest.fn(),
  setName: jest.fn(),
  setDescription: jest.fn(),
  setIsLoading: jest.fn(),
  handleNameChange: jest.fn(),
  handleDescriptionChange: jest.fn(),
  handleBlur: jest.fn(),
  isLoading: true,
  setCategoriesData: jest.fn(),
  categoriesData: [],
  subCategoriesData: [],
  subEventCategoriesData: [],
  subOutfitCategoriesData: [],
  fetchSubCategoryData: jest.fn(),
  fetchCategoriesData: jest.fn(),
  formik: {
    initialValues: {
      name: '',
      description: '',
      gender: '',
      eventType: '',
      outfitType: '',
      itemType: '',
    },
    validationSchema: {
      validateOnBlur: jest.fn(),
      validateOnChange: jest.fn(),
      values: {},
      errors: {},
      touched: {},
      isValid: true,
      isSubmitting: false,
      submitForm: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
    },
  },
  gender: '',
  eventType: '',
  outfitType: '',
  itemType: '',
  default: jest.fn(),
  __esModule: true,
}));
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
describe('AddItems Screen', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useAdditems as jest.Mock).mockReturnValue({
      name: '',
      description: '',
      setGender: jest.fn(),
      setEventType: jest.fn(),
      setOutfitType: jest.fn(),
      setItemType: jest.fn(),
      handleGenderChange: jest.fn(),
      handleEventTypeChange: jest.fn(),
      handleOutfitChange: jest.fn(),
      handleItemTypeChange: jest.fn(),
      handleItems: jest.fn(),
      setName: jest.fn(),
      setDescription: jest.fn(),
      setIsLoading: jest.fn(),
      handleNameChange: jest.fn(),
      handleDescriptionChange: jest.fn(),
      handleBlur: jest.fn(),
      isLoading: false,
      setCategoriesData: jest.fn(),
      categoriesData: [],
      subCategoriesData: [],
      subEventCategoriesData: [],
      subOutfitCategoriesData: [],
      fetchSubCategoryData: jest.fn(),
      fetchCategoriesData: jest.fn(),
      formik: {
        touched: {},
        errors: {},
        isValid: true,
        handleSubmit: jest.fn(),
      },
      gender: '',
      eventType: '',
      outfitType: '',
      itemType: '',
    });

    useSelector.mockImplementation(selector =>
      selector({
        category: {data: []},
        GenderReducer: {data: []},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the AddItems Screen', () => {
    const result = render(<Additems />);
    expect(result).toBeDefined();
  });
  it('should render the LoadingScreen', () => {
    (useAdditems as jest.Mock).mockReturnValue({
      isLoading: true,

      categoriesData: [],
      subCategoriesData: [],
      subEventCategoriesData: [
        {
          id: 1,
          subbCategoryName: 'shirt',
        },
      ],
      subOutfitCategoriesData: [],
    });
    const result = render(<Additems />);
    expect(result).toBeDefined();
  });
  it('should get the Errors in the formik', () => {
    (useAdditems as jest.Mock).mockReturnValue({
      name: '',
      description: '',
      event: '',
      setName: jest.fn(),
      setDescription: jest.fn(),
      setIsLoading: jest.fn(),
      handleNameChange: jest.fn(),
      handleDescriptionChange: jest.fn(),
      handleBlur: jest.fn(),
      isLoading: false,
      formik: {
        touched: {name: true, description: true, gender: true, eventType: true}, // Update with your desired values
        errors: {
          name: 'Name is required',
          description: 'Description is required',
          gender: 'gender is required',
          eventType: 'Event type is required',
        }, // Update with your desired values
        isValid: false, // Update with your desired value
        handleSubmit: jest.fn(),
      },
      categoriesData: [],
      subCategoriesData: [],
      subEventCategoriesData: [
        {
          id: 1,
          subbCategoryName: 'shirt',
        },
      ],
      subOutfitCategoriesData: [],
      gender: '',
      eventType: '',
      outfitType: '',
      itemType: '',
    });
    const {getByTestId, getByText} = render(<Additems />);
    const NameInput = getByTestId('Name-Input');
    expect(NameInput).toBeDefined();
    fireEvent(NameInput, 'blur');

    const errorText = getByText('Name is required'); // Adjust this based on your actual error message
    expect(errorText).toBeDefined();

    const description = getByTestId('description-Input');
    expect(description).toBeDefined();
    fireEvent(description, 'blur');

    const descriptionError = getByText('Description is required'); // Adjust this based on your actual error message
    expect(descriptionError).toBeDefined();

    const eventDropdown = getByTestId('Event-dropdown');
    expect(eventDropdown).toBeDefined();
    fireEvent.press(eventDropdown);
    const eventError = getByText('Event type is required'); // Adjust this based on your actual error message
    expect(eventError).toBeDefined();
  });
});
