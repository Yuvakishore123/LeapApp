/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {removeAddress} from '../../redux/actions/actions';
import {ListAddress} from '../../redux/slice/listAddressSlice';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

type RootStackParamList = {
  EditAddress: {address: any};
  Owneraddaddress: undefined;
};
const useAddress = () => {
  const addressdata = useSelector(
    (state: {listAddress: {data: any}}) => state.listAddress.data,
  );
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
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
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };

  console.log('address for the owner and borrower', addressdata);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(ListAddress() as any);
      const data = addressdata;
      setIsLoading(false);
      setIsLoading(false);
      setAddress(data);
      setCity(data.city);
      setId(data.id);
      setStateName(data.state);
      setaddressLine1(data.addressLine1);
      setaddressLine2(data.addressLine2);
      setpostalCode(data.postalCode);
      setIsLoading(false);
      console.log(
        id,
        city,
        state,
        country,
        postalCode,
        addressLine1,
        addressLine2,
      );
    } catch (error) {
      console.log('Error is ', error);
      setIsLoading(true);
    }
  }, [id, city, state, country, postalCode, addressLine1, addressLine2]);

  useEffect(() => {
    fetchData();
    ListAddress();
  }, [fetchData, ListAddress]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
      ListAddress();
    });
    return unsubscribe;
  }, [fetchData, ListAddress, navigation]);
  const handleEditItems = (item: any) => {
    navigation.navigate('EditAddress', {address: item});
  };
  const handleOwnerAddAddress = () => {
    navigation.navigate('Owneraddaddress');
  };
  const handleDeleteAddress = (deleteId: number) => {
    dispatch(removeAddress(deleteId) as any);
    openModal();
  };
  const goBackButton = () => {
    navigation.goBack();
  };
  return {
    addressList,
    handleOwnerAddAddress,
    handleDeleteAddress,
    isFocused,
    goBackButton,
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
    // FetchAddress,
  };
};
export default useAddress;
