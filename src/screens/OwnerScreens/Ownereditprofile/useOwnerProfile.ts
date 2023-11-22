import {useEffect, useState} from 'react';

import {
  getProfileData,
  selectProfileDataLoading,
  selectprofileData,
} from '../../../redux/slice/profileDataSlice';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../../redux/slice/editProfileSlice';
const OwnerEditProfileCustomHook = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const Data = useSelector(selectprofileData);
  const isLoading = useSelector(selectProfileDataLoading);

  // Function to open the modal and dispatch action to get profile data
  const openModal = () => {
    dispatch(getProfileData() as any);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Effect hook to fetch and update local state with profile data
  useEffect(() => {
    // Function to fetch and update local state with profile data
    const fetchProfileData = () => {
      setFirstName(Data.firstName);
      setLastName(Data.lastName);
      setEmail(Data.email);
      setPhoneNumber(Data.phoneNumber);
    };

    // Invoke the fetchProfileData function when the specified dependencies change
    fetchProfileData();
  }, [Data.email, Data.firstName, Data.lastName, Data.phoneNumber]);

  // Effect hook to dispatch action to get profile data when the component mounts
  useEffect(() => {
    dispatch(getProfileData() as any);
  }, [dispatch]);

  // Function to handle the update of profile data
  const handleUpdate = async () => {
    // Prepare data object with updated profile information
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };

    // Dispatch action to update profile data
    dispatch(updateProfile(data) as any);

    // Open the modal
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
    isFormValid,
    setIsFormValid,
  };
};
export default OwnerEditProfileCustomHook;
