import {Alert, Linking, PermissionsAndroid} from 'react-native';
import {useEffect, useState} from 'react';
import {profileUpload, url} from '../../../constants/Apis';
import {launchImageLibrary} from 'react-native-image-picker';
import ApiService from '../../../network/network';
import {useSelector} from 'react-redux';
import {
  getProfileData,
  selectProfileDataLoading,
  selectprofileData,
} from '../../../redux/slice/profileDataSlice';
import {logMessage, useThunkDispatch} from '../../../helpers/helper';

import Toast from 'react-native-toast-message';
import AsyncStorageWrapper from '../../../utils/asyncStorage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  Ownereditprofile: undefined;
  Owneraddresspage: undefined;
  MyOrder: undefined;
};
// Custom hook for managing profile-related functionality
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {log} = logMessage();
  const data = useSelector(selectprofileData);
  const loading = useSelector(selectProfileDataLoading);
  // Function to fetch profile data
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      dispatch(getProfileData());
    } catch (error) {
      log.error('error during fetching profile data');
    } finally {
      setIsLoading(false);
    }
  };
  // Effect to fetch profile data on component mount
  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);
  // Function to refresh profile data
  const refreshData = () => {
    setRefreshState(true);
  };

  // Function to open the first modal
  const openModal = async () => {
    setShowModall(true);
    setRefreshState(true);
    await fetchProfileData(); // Wait for the asynchronous operation to complete
    setRefreshState(false);
  };
  // Function to close the first modal
  const closeModal = () => {
    setShowModall(false);
  };
  // Function to open the second modal
  const openModal1 = () => {
    setShowModall1(true);
  };
  // Function to close the second modal
  const closeModal1 = () => {
    setShowModall1(false);
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };
  // Show a dialog or message to the user explaining why the permission is needed
  // and provide a button to open the app settings
  const showDialogToAppSettings = () => {
    Alert.alert(
      'Permission Required',
      'To upload images, please grant access to your photo library in app settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => openAppSettings(),
        },
      ],
    );
  };

  const ImageUpload = async () => {
    // Check if permission is granted
    const status = await AsyncStorageWrapper.getItem('Status');
    const isPermissionGranted = status === 'granted';

    if (isPermissionGranted) {
      // Permission is granted, you can proceed with image picking.
      await pickImage();
    } else {
      // Permission is denied or not granted, handle it accordingly.
      requestCameraPermission();
    }
  };

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      showDialogToAppSettings();
    } else if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await pickImage();
    }
  };

  const pickImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

      if (response.didCancel) {
        log.info('User cancelled selection');
      } else if (response.errorCode) {
        log.info('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const images = response.assets
          .map(imageAsset => {
            // Check the size of each image
            if (imageAsset.fileSize && imageAsset.fileSize > 100000) {
              // Skip images that exceed the maximum allowed size
              log.info(
                `Image exceeds maximum size: ${imageAsset.fileName} `,
                imageAsset.fileSize,
              );
              return null;
            }
            return {
              uri: imageAsset.uri,
              type: 'image/png', // You can set the appropriate content type here
              name: 'image.png', // You can set the desired name here
              size: `${imageAsset.fileSize}kb`, // Update the size property with the actual file size
            };
          })
          .filter(image => image !== null); // Remove images that exceeded the size limit

        if (images.length === 0) {
          showToast();
          setIsloading(false);
          return;
        }

        const formData = new FormData();
        images.forEach(file => {
          formData.append('file', file);
        });

        setIsloading(true);
        const token = await AsyncStorageWrapper.getItem('token');
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
          setProfileImage(res.url); // Update the profilePic state with the uploaded image URL
          uploadImage(res.url);
          fetchProfileData();
          openModal();
        } else {
          // Handle the case when the upload fails.
        }
      }
    } catch (error) {
      setIsloading(false);
      // Handle errors here.
    }
  };

  // Function to handle image upload to the server
  const uploadImage = async (imageurl: string) => {
    await ApiService.post(`${profileUpload}=${imageurl}`, {});
    fetchProfileData();
  };

  // Function to handle the removal of the profile picture
  const handleRemoveProfilePic = async () => {
    await ApiService.post(`${profileUpload}=${null}`, {});
    dispatch(getProfileData());

    setProfileImage('');
    openModal1();
  };
  // Function to show a toast message
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'File size should be less than 1 MB',
      text2: ' Image Size Exceeding',
    });
  };
  // Function to navigate to the address editing page
  const handleEditAddress = () => {
    navigation.navigate('Owneraddresspage');
  };
  // Function to navigate to the owner screen
  const handleOwnerScreen = () => {
    navigation.navigate('MyOrder');
  };
  // Function to navigate to the profile editing page
  const handleEditProfile = () => {
    navigation.navigate('Ownereditprofile');
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
    isLoading,
    ImageUpload,
    dispatch,
    showDialogToAppSettings,
    openAppSettings,
    requestCameraPermission,

    setIsLoading,
    handleEditAddress,
    handleOwnerScreen,
    handleEditProfile,
    showToast,
  };
};

export default useProfile;
