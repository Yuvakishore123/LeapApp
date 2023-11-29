import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Yup from 'yup';
import {SetStateAction, useState} from 'react';
import {useFormik} from 'formik';

import {addsize} from '../../redux/actions/actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {url as baseUrl} from 'constants/Apis';
import {ProductAdd} from '../../redux/slice/ProductAddSlice';
import {PermissionsAndroid} from 'react-native';
import {logger} from 'react-native-logs';
import {useThunkDispatch, defaultConfig} from 'helpers/helper';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import {
  ItemCategoryIdReducer,
  ItemDataReducer,
} from '../../../src/redux/reducers/Additemsreducers';

type RootStackParamList = {
  Home: {screen: any};
  ProfileScreen: {screen: any};
};
const useAddImages = () => {
  const logMessage = logger.createLogger(defaultConfig);
  const [selectedsize, setSelectedsize] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [selectedImage, setSelectedImage] = useState('');

  const [imageUris, setImageUris] = useState([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {dispatch} = useThunkDispatch();
  const name = useSelector(ItemDataReducer);
  const description = useSelector(
    (state: {ItemsReducer: {Description: string}}) =>
      state.ItemsReducer.Description,
  );
  const categoryIds = useSelector(ItemCategoryIdReducer);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    navigation.navigate('Home', {screen: 'OwnerHome'});
    setShowModal(false);
  };
  const subcategoryIds = useSelector(
    (state: {ItemsReducer: {subcategoryIds: []}}) =>
      state.ItemsReducer.subcategoryIds,
  );
  const AdditemsvalidationSchema = Yup.object().shape({
    size: Yup.string().required('Size is required'),
    price: Yup.number()
      .required('Price is required')
      .min(100, 'Price must be greater than 100'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be greater than zero'),
  });
  const handleSizeTypeChange = (selectedSize: SetStateAction<string>) => {
    setSelectedsize(selectedSize);
    formik.setFieldValue('size', selectedSize);
  };
  const handlePriceChange = (value: any) => {
    setPrice(value);
    formik.setFieldValue('price', value);
  };
  const handleSelectedImage = (image: any) => {
    setSelectedImage(image);
    formik.setFieldValue('image', image.url);
  };
  const handleQuantityChange = (value: any) => {
    setQuantity(value);
    formik.setFieldValue('quantity', value);
  };
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };
  const onHandleOwnerItems = () => {
    navigation.goBack();
  };
  const postData = async () => {
    const Data = {
      brand: 'adiddas',
      categoryIds: categoryIds,
      color: 'black',
      name: name,
      description: description,
      id: 0,
      imageUrl: imageUrls, // Use the imageUrls state
      material: 'fibre',
      price: price,
      totalQuantity: quantity,
      size: selectedsize,
      subcategoryIds: subcategoryIds,
    };
    dispatch(ProductAdd(Data));
    dispatch(addsize(selectedsize));
    openModal();
  };

  const handleremove = () => {
    setSelectedImage('');
  };
  const handleRemoveImage = (index: number) => {
    setImageUrls(prevUrls => prevUrls.filter((url, i) => i !== index));
    setIsLoading(false);
  };
  const pickImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
      },
      async response => {
        if (response.didCancel) {
          logMessage.error('User cancelled image picker');
        } else if (response.errorMessage) {
          logMessage.error('ImagePicker Error: ', response.errorMessage);
        } else {
          const images = (response as {assets: {uri: string}[]}).assets.map(
            imagePath => ({
              uri: imagePath.uri,
              type: 'image/png',
              name: 'image.png',
            }),
          );
          const formData = new FormData();
          images.forEach((file, _index) => {
            formData.append('file', {
              uri: file.uri,
              type: 'image/png',
              name: 'image.png',
            });
          });
          setIsLoading(true);
          try {
            const token = await asyncStorageWrapper.getItem('token');
            logMessage.error(token);
            const result = await fetch(
              `${baseUrl}/file/uploadProductImage?categoryId=${categoryIds}&subcategoryId=${subcategoryIds[0]}`,
              {
                method: 'POST',
                body: formData,
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (result.ok) {
              const res = await result.json();
              logMessage.error(res);
              setImageUrls(prevUrls => [...prevUrls, ...res.urls]);
              setIsLoading(false);
              logMessage.error(imageUrls);
            } else {
              const res = await result.json();
              logMessage.error('Upload failed');
              logMessage.error(res);
              logMessage.error(token);
              setIsLoading(true);
            }
          } catch (error) {
            logMessage.error('error in uploading images', error);
          }
        }
      },
    );
  };
  const checkPermission = async () => {
    const permissionGranted = await asyncStorageWrapper.getItem(
      'permissionGranted',
    );
    const Grantedpermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (permissionGranted === 'true' && Grantedpermission) {
      pickImages();
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
        logMessage.error('Storage permission granted');
        await asyncStorageWrapper.setItem('permissionGranted', 'true');
        pickImages();
      } else {
        logMessage.error('Storage permission denied');
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      size: '',
      price: '',
      image: '',
      quantity: '',
    },
    validationSchema: AdditemsvalidationSchema,
    onSubmit: postData,
  });
  return {
    onHandleOwnerItems,
    postData,
    handleRemoveImage,
    handleSelectedImage,
    handleSizeTypeChange,
    imageUrls,
    setImageUris,
    selectedsize,
    setSelectedsize,
    setPrice,
    setQuantity,
    selectedImage,
    handleremove,
    formik,
    checkPermission,
    handlePriceChange,
    handleQuantityChange,
    quantity,
    price,
    setImageUrls,
    handleBlur,
    pickImages,
    imageUris,
    closeModal,
    showModal,
    openModal,
    isLoading,
  };
};
export default useAddImages;
