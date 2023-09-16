import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect, useState} from 'react';
import {profileUpload, url} from '../../constants/Apis';
import {launchImageLibrary} from 'react-native-image-picker';
import ApiService from '../../network/network';
import {useSelector} from 'react-redux';
import {getProfileData} from '../../redux/slice/profileDataSlice';
import {logMessage, useThunkDispatch} from '../../helpers/helper';
import {PermissionsAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
const useProfile = () => {
  const MAX_IMAGE_SIZE_BYTES = 1024 * 1024;
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
        selectionLimit: 1,
      },
      async response => {
        if (response.didCancel) {
          logMessage.error('User cancelled image picker');
        } else if (response.errorCode) {
          logMessage.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets) {
          const image = response.assets[0];
          const imageSizeBytes = image.fileSize;

          if (imageSizeBytes <= MAX_IMAGE_SIZE_BYTES) {
            // Image size is within the acceptable limit, proceed with upload
            const formData = new FormData();
            formData.append('file', {
              uri: image.uri,
              type: 'image/png',
              name: 'image.png',
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
                setSelectedImage(res.url);
                setProfileImage(res.url);
                uploadImage(res.url);
                fetchProfileData();
                openModal();
              } else {
                const res = await result.json();
                logMessage.error('Upload failed in profile picture', res);
              }
            } catch (error) {
              console.error(error);
              setIsloading(true);
            }
          } else {
            showToast();
          }
        }
      },
    );
  };
  const checkPermission = async () => {
    try {
      const permissionGranted = await AsyncStorage.getItem('permissionGranted');
      if (permissionGranted === 'true') {
        pickImage();
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to upload images.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await AsyncStorage.setItem('permissionGranted', 'true');
          pickImage();
        } else {
          logMessage.error('Storage permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error in uploading and size should be < 1MB',
    });
  };
  const uploadImage = async (imageurl: string) => {
    const response = await ApiService.post(`${profileUpload}=${imageurl}`, {});
    fetchProfileData();
    logMessage.error('Upload response', response);
  };

  const handleRemoveProfilePic = async () => {
    const response = await ApiService.post(`${profileUpload}=${null}`, {});
    logMessage.error('Upload response', response);
    dispatch(getProfileData());
    setProfileImage('');
    openModal1();
  };

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
    checkPermission,
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
