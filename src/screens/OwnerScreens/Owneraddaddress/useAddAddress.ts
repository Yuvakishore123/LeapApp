import {useState, SetStateAction, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Alert} from 'react-native';
import ApiService from '../../../network/network';
import {RootStackParamList} from '../../BorrowerScreens/Subcategory/Subcategory';
import {StackNavigationProp} from '@react-navigation/stack';

import {AddressAdd} from '../../../redux/slice/AddressAddSlice';
import {logMessage, useThunkDispatch} from '../../../helpers/helper';
import {ListAddress} from '../../../redux/slice/listAddressSlice';

const useAddAddress = () => {
  const [city, setCity] = useState('');
  const [addressLine1, setaddressLine1] = useState('');
  const [addressLine2, setaddressLine2] = useState('');
  const [addressType, setaddressType] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setStateName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {log} = logMessage();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    navigation.goBack();
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {dispatch} = useThunkDispatch();
  // Validation schema using Yup for address form fields
  const AddressSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Enter Address Line 1'),
    addressLine2: Yup.string().required('Enter Street Name'),
  });

  // Function to fetch address details based on postal code
  const FetchAddress = async () => {
    try {
      const result = await ApiService.get(
        `https://api.postalpincode.in/pincode/${postalCode}`,
      );
      const data = result[0]?.PostOffice || [];
      setIsLoading(false);

      // Set country, city, and state based on fetched address data
      setCountry(data[0]?.Country || '');
      setCity(data[0]?.District || '');
      setStateName(data[0]?.State || '');
    } catch (error) {
      log.error('Error during saving address', error);
      Alert.alert('Enter a valid Pincode');
    } finally {
      setIsLoading(false);
    }
  };

  // State for the selected address type option
  const [selectedOption, setSelectedOption] = useState('HOME');
  const handleOptionChange = (value: SetStateAction<string>) => {
    setSelectedOption(value);
  };

  // Function to handle postal code change and trigger address fetch
  const handlePostalCodeChange = async (text: string) => {
    setpostalCode(text);
    if (text.length > 6) {
      Alert.alert('Enter a valid pincode');
    } else if (text.length === 6) {
      setIsLoading(true);
      await FetchAddress();
      setIsLoading(false);
    }
  };

  // State for the checkbox indicating the default address
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Function to handle the save address action
  const handleSaveAddress = () => {
    const addressData = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      addressType: selectedOption,
      city: city,
      country: country,
      postalCode: postalCode,
      state: state,
      defaultType: isChecked,
    };
    dispatch(AddressAdd(addressData));
    dispatch(ListAddress());
    openModal();
  };

  // Formik hook for managing form state, validation, and submission
  const formik = useFormik({
    initialValues: {
      addressLine1: '',
      addressLine2: '',
    },
    validationSchema: AddressSchema,
    onSubmit: handleSaveAddress,
  });

  // Function to handle change in Address Line 1 field
  const handleAddressLine1 = (value: string) => {
    setaddressLine1(value);
    formik.setFieldValue('addressLine1', value);
  };

  // Function to handle change in Address Line 2 field
  const handleAddressLine2 = (value: string) => {
    setaddressLine2(value);
    formik.setFieldValue('addressLine2', value);
  };

  // Function to handle onBlur event for a specific field
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };

  // Effect hook to fetch address data when postal code changes
  useEffect(() => {
    if (postalCode !== '') {
      FetchAddress();
    } else {
      log.error();
    }
  }, [postalCode, log]);

  return {
    city,
    postalCode,
    state,
    country,
    addressLine1,
    addressLine2,
    setaddressType,
    setStateName,
    addressType,
    setCity,
    setpostalCode,
    setCountry,
    setaddressLine1,
    setaddressLine2,
    handleSaveAddress,
    handleCheckboxChange,
    handleOptionChange,
    selectedOption,
    isChecked,
    handlePostalCodeChange,
    handleAddressLine1,
    FetchAddress,
    isLoading,
    showLoader,
    setShowLoader,
    setIsLoading,
    handleBlur,
    formik,
    handleAddressLine2,

    openModal,
    closeModal,
    showModal,
  };
};
export default useAddAddress;
