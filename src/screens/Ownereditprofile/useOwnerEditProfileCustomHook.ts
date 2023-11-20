import {useEffect, useState} from 'react';

import {
  getProfileData,
  profileLoadingreducer,
  profiledatareducer,
} from '../../redux/slice/ProfileDataSlice';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../redux/slice/EditProfileSlice';
const useOwnerEditProfileCustomHook = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const Data = useSelector(profiledatareducer);
  const isLoading = useSelector(profileLoadingreducer);

  const openModal = () => {
    dispatch(getProfileData() as any);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchProfileData = () => {
      setFirstName(Data.firstName);
      setLastName(Data.lastName);
      setEmail(Data.email);
      setPhoneNumber(Data.phoneNumber);
    };
    fetchProfileData();
  }, [Data.email, Data.firstName, Data.lastName, Data.phoneNumber]);
  useEffect(() => {
    dispatch(getProfileData() as any);
  }, [dispatch]);
  const handleUpdate = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    dispatch(updateProfile(data) as any);
    openModal();
  };
  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    handleUpdate,
    isLoading,
    openModal,
    closeModal,
    showModal,
    Data,
  };
};
export default useOwnerEditProfileCustomHook;
