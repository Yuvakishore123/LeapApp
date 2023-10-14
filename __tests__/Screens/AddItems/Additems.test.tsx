import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Additems from 'screens/Additems/Additems';
import useAdditems from 'screens/Additems/useAdditems';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
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
  isLoading: false,
  setCategoriesData: jest.fn(),
  categoriesData: [],
  subCategoriesData: [],
  subEventCategoriesData: [],
  subOutfitCategoriesData: [],
  fetchSubCategoryData: jest.fn(),
  fetchCategoriesData: jest.fn(),
  formik: {
    touched: {name: true, description: true, gender: true, eventType: true},
    errors: {
      name: 'Name is required',
      description: 'Description is required',
      gender: 'Gender is required',
      eventType: 'Event type is required',
    },
  },
  gender: '',
  eventType: '',
  outfitType: '',
  itemType: '',
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('Additems Screen', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
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
        touched: {name: true, description: true, gender: true, eventType: true},
        errors: {
          name: 'Name is required',
          description: 'Description is required',
          gender: 'Gender is required',
          eventType: 'Event type is required',
        },
      },
      gender: '',
      eventType: '',
      outfitType: '',
      itemType: '',
    });
  });
  it('renders correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Additems" component={Additems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
  it('handles BLur function for name correctly', () => {
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
    const name = getByTestId('name');
    expect(name).toBeDefined();
    fireEvent(name, 'blur');

    const errorText = getByText('Name is required'); // Adjust this based on your actual error message
    expect(errorText).toBeDefined();
  });
  it('handles BLur function for description correctly', () => {
    const Stack = createNativeStackNavigator();
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

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Additems" component={Additems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const description = getByTestId('description');
    expect(description).toBeDefined();
    fireEvent(description, 'blur');

    const descriptionError = getByText('Description is required'); // Adjust this based on your actual error message
    expect(descriptionError).toBeDefined();
  });
  it('handles BLur function for gender correctly', () => {
    const Stack = createNativeStackNavigator();
    (useAdditems as jest.Mock).mockReturnValue({
      name: '',
      handleBlur: jest.fn(),
      isLoading: false,
      categoriesData: [],
      subCategoriesData: [],
      subEventCategoriesData: [],
      subOutfitCategoriesData: [],
      formik: {
        touched: {name: true, description: true, gender: true, eventType: true},
        errors: {
          name: 'Name is required',
          description: 'Description is required',
          gender: 'Gender is required',
          eventType: 'Event type is required',
        },
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
          values: {name: ''},
          errors: {name: ''},
          touched: {name: ''},
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
    });

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Additems" component={Additems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const GenderDropdown = getByTestId('GenderDropdown');
    act(() => {
      fireEvent.press(GenderDropdown);
    });
    expect(getByText('Gender is required')).toBeDefined();
  });
  it('handles BLur function for EventType correctly', () => {
    const Stack = createNativeStackNavigator();
    (useAdditems as jest.Mock).mockReturnValue({
      name: '',
      handleBlur: jest.fn(),
      isLoading: false,
      categoriesData: [],
      subCategoriesData: [],
      subEventCategoriesData: [],
      subOutfitCategoriesData: [],
      formik: {
        touched: {name: true, description: true, gender: true, eventType: true},
        errors: {
          name: 'Name is required',
          description: 'Description is required',
          gender: 'Gender is required',
          eventType: 'Event type is required',
        },
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
          values: {name: ''},
          errors: {name: ''},
          touched: {name: ''},
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
    });

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Additems" component={Additems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const EventType = getByText('Select Event');
    act(() => {
      fireEvent.press(EventType);
    });
    expect(getByText('Event type is required')).toBeDefined();
  });
});
