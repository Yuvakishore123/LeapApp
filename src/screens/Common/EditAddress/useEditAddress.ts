import React, {useContext, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../../constants/colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {
  editAddressData,
  selectEditAddressData,
} from '../../../redux/slice/editAddressSlice';
import {ListAddress} from '../../../redux/slice/listAddressSlice';

const useEditAddress = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const address = (route.params as any)?.address;
  const response = useSelector(selectEditAddressData);
  const [city, setCity] = useState(address?.city || ''); // Use a default value if address or city is undefined

  const [state, setStateName] = useState(address?.state || '');
  const [addressid] = useState(address?.id || '');
  const [addressLine1, setAddressLine1] = useState(address?.addressLine1);
  const [addressLine2, setAddressLine2] = useState(address?.addressLine2);
  const [postalCode, setPostalCode] = useState(address?.postalCode);
  const [country, _setCountry] = useState(address?.country);
  const [selectedOption, setSelectedOption] = useState('Home');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);
  const [isChecked, setIsChecked] = useState(false);
  const [placeholderTextColor, _setPlaceholderTextColor] = useState(
    colorScheme === 'dark' ? colors.white : colors.black,
  );
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

  // Function to open the modal and dispatch an action to list addresses
  const openModal = () => {
    dispatch(ListAddress());
    setShowModal(true);
  };

  // Function to close the modal and navigate back
  const closeModal = () => {
    setShowModal(false);
    navigation.goBack();
  };

  // Function to handle the change of the selected option
  const handleOptionChange = (value: React.SetStateAction<string>) => {
    setSelectedOption(value);
  };

  // Function to handle the change of the postal code
  const handlePostalcode = (value: React.SetStateAction<string>) => {
    setPostalCode(value);
  };

  // Function to handle the change of the checkbox state
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Function to handle the update of the address data
  const handleUpdateAddress = async () => {
    const updateaddress = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      addressType: selectedOption,
      city: city,
      country: country,
      postalCode: postalCode,
      state: state,
      defaultType: isChecked,
    };
    dispatch(editAddressData({updateaddress, addressid}));
  };

  // Function to handle the response and open the modal if there is a response
  const handleResponse = () => {
    if (response) {
      setIsLoading(false);
      openModal();
    }
  };

  // Effect hook to handle the response when the component mounts
  useEffect(() => {
    handleResponse();
  });

  // Function to set the placeholder color based on the color scheme
  const [PlaceholderColor, _setPlaceholderColor] = useState(
    colorScheme === 'dark' ? colors.Textinput : colors.black,
  );

  // Returning an object with all the functions and relevant state variables
  return {
    handleUpdateAddress,
    handlePostalcode,
    selectedOption,
    setCity,
    isChecked,
    city,
    addressLine1,
    setStateName,
    closeModal,
    openModal,
    setShowModal,
    showModal,
    postalCode,
    setPostalCode,
    addressLine2,
    handleOptionChange,
    handleCheckboxChange,
    state,
    setAddressLine1,
    setAddressLine2,
    isLoading,
    PlaceholderColor,
    placeholderTextColor,
  };
};
export default useEditAddress;
