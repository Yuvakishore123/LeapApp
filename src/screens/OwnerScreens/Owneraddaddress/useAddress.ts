/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';

import {
  ListAddress,
  selectListAddressData,
  selectListAddressLoading,
} from '../../../redux/slice/listAddressSlice';

import {useThunkDispatch} from '../../../helpers/helper';
import {removeAddress} from '../../../redux/reducers/AddressRemoveReducer';

type RootStackParamList = {
  EditAddress: {address: any};
  Owneraddaddress: undefined;
};
const useAddress = () => {
  const addressdata = useSelector(selectListAddressData);
  const isloading = useSelector(selectListAddressLoading);
  const {dispatch} = useThunkDispatch();
  const [addressList, setAddress] = useState([]);
  const [city, setCity] = useState('');
  const [addressLine1, setaddressLine1] = useState('');
  const [addressLine2, setaddressLine2] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('india');
  const [state, setStateName] = useState('');
  const [isFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal and fetch data
  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };

  // Callback function to fetch address data
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    // Dispatch action to list addresses
    dispatch(ListAddress() as any);

    // Extract data from the addressdata state
    const data = addressdata;

    setIsLoading(false);

    // Set various state variables with the fetched data
    setAddress(data);
    setCity(data.city);
    setId(data.id);
    setStateName(data.state);
    setaddressLine1(data.addressLine1);
    setaddressLine2(data.addressLine2);
    setpostalCode(data.postalCode);
  }, [id, city, state, country, postalCode, addressLine1, addressLine2]);

  // Effect hook to fetch data when the component mounts or when the data dependencies change
  useEffect(() => {
    dispatch(ListAddress());
    fetchData();
  }, [fetchData]);

  // Effect hook to fetch data when the screen is in focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [fetchData, navigation]);

  // Function to handle editing of address items
  const handleEditItems = (item: any) => {
    navigation.navigate('EditAddress', {address: item});
  };

  // Function to navigate to the screen for adding a new address
  const handleOwnerAddAddress = () => {
    navigation.navigate('Owneraddaddress');
  };

  // Function to handle the deletion of an address
  const handleDeleteAddress = (deleteId: number) => {
    dispatch(removeAddress(deleteId) as any);
    openModal();
  };

  return {
    addressList,
    handleOwnerAddAddress,
    handleDeleteAddress,
    isFocused,

    city,
    state,
    postalCode,
    addressLine1,
    addressLine2,
    setCity,
    showModal,
    setCountry,
    setaddressLine1,
    setaddressLine2,
    isLoading,
    setStateName,
    setpostalCode,
    openModal,
    closeModal,
    handleEditItems,
    addressdata,
    isloading,
    fetchData,
    // FetchAddress,
  };
};
export default useAddress;
