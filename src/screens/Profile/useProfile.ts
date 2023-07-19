import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect, useState} from 'react';
import {profileUpload, url} from '../../constants/Apis';
import {launchImageLibrary} from 'react-native-image-picker';
import ApiService from '../../network/network';
import {useSelector} from 'react-redux';
import {getProfileData} from '../../redux/slice/profileDataSlice';
import {useThunkDispatch} from '../../helpers/helper';

const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, _setImageUrls] = useState([]);
  const [profilePic, setProfileImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [showModall, setShowModall] = useState(false);
  const [showModal1, setShowModall1] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const {dispatch} = useThunkDispatch();
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      dispatch(getProfileData());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);
  const data = useSelector(
    (state: {profileData: {data: any}}) => state.profileData.data,
  );
  const loading = useSelector(
    (state: {profileData: {isLoader: any}}) => state.profileData.isLoader,
  );
  const refreshData = () => {
    setRefreshState(true);
  };

  const openModal = () => {
    setShowModall(true);
    setRefreshState(true);
    fetchProfileData();
    setRefreshState(false);
  };
  const closeModal = () => {
    setShowModall(false);
  };
  const openModal1 = () => {
    setShowModall1(true);
  };
  const closeModal1 = () => {
    setShowModall1(false);
  };

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets) {
          const images = response.assets.map(imagePath => ({
            uri: imagePath.uri,
            type: 'image/png',
            name: 'image.png',
          }));
          const formData = new FormData();
          images.forEach(file => {
            formData.append('file', file);
          });
          try {
            setIsloading(true);
            const token = await AsyncStorage.getItem('token');
            const result = await fetch(`${url}/file/uploadProfileImage`, {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            if (result.ok) {
              const res = await result.json();
              setIsloading(false);
              console.log('res is ', res);
              setSelectedImage(res.url);
              setProfileImage(res.url); // Update the profilePic state with the uploaded image URL
              uploadImage(res.url);
              fetchProfileData();
              openModal();
            } else {
              const res = await result.json();
              console.log('Upload failed');
              console.log(res);
              console.log(token);
            }
          } catch (error) {
            console.error(error);
            setIsloading(true);
          }
        }
      },
    );
  };

  const uploadImage = async (imageurl: string) => {
    console.log('selected image is ', imageurl);

    const response = await ApiService.post(`${profileUpload}=${imageurl}`, {});
    fetchProfileData();

    console.log('Upload response', response);
  };

  const handleRemoveProfilePic = async () => {
    const response = await ApiService.post(`${profileUpload}=${null}`, {});
    console.log('Upload response', response);
    dispatch(getProfileData());
    setProfileImage('');
    openModal1();
  };

  console.log(selectedImage);
  console.log('profilePic', profilePic);

  return {
    isloading,
    pickImage,
    uploadImage,
    imageUrls,
    profilePic,
    handleRemoveProfilePic,
    setProfileImage,
    selectedImage,
    setSelectedImage,
    loading,
    setIsloading,
    openModal,
    closeModal,
    showModall,
    closeModal1,
    data,
    openModal1,
    showModal1,
    refreshData,
    refreshState,
    fetchProfileData,
    isLoading, // Expose the fetchProfileData function
  };
};

export default useProfile;
