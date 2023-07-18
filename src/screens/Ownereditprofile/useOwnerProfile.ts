import {useEffect, useState} from 'react';

import {getProfileData} from '../../redux/slice/profileDataSlice';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../redux/slice/editProfileSlice';
const OwnerEditProfileCustomHook = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const Data = useSelector(state => state.profileData.data);
  const isLoading = useSelector(state => state.profileData.isLoader);

  const openModal = () => {
    dispatch(getProfileData());
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
  console.log('Date here is', Data);
  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);
  const handleUpdate = async () => {
    const data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    });
    try {
      dispatch(updateProfile(data));
      console.log();
      openModal();
    } catch (error) {
      console.error(error);
    }
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
export default OwnerEditProfileCustomHook;
