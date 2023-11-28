/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {removeAddress} from '../../redux/actions/actions';
import {ListAddress} from '../../redux/slice/listAddressSlice';

import {useThunkDispatch} from 'helpers/helper';

type RootStackParamList = {
  EditAddress: {address: any};
  Owneraddaddress: undefined;
};
const useAddress = () => {
  const addressdata = useSelector(
    (state: {listAddress: {data: any}}) => state.listAddress.data,
  );
  const isloading = useSelector(
    (state: {listAddress: {isLoader: boolean}}) => state.listAddress.isLoader,
  );
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
  useEffect(() => {
    console.log('in uneeffect');
    dispatch(ListAddress());
    fetchData();
  }, []);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    dispatch(ListAddress() as any);
    const data = addressdata;
    setIsLoading(false);
    setAddress(data);
    setCity(data.city);
    setId(data.id);
    setStateName(data.state);
    setaddressLine1(data.addressLine1);
    setaddressLine2(data.addressLine2);
    setpostalCode(data.postalCode);
  }, [id, city, state, country, postalCode, addressLine1, addressLine2]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [fetchData, navigation]);
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
  return {
    addressList,
    handleOwnerAddAddress,
    handleDeleteAddress,
    isFocused,
    fetchData,
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
    // FetchAddress,
  };
};
export default useAddress;
