import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Yup from 'yup';
import {SetStateAction, useEffect, useState} from 'react';

import {useFormik} from 'formik';

import {addsize} from '../../redux/actions/actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {url as baseUrl} from '../../constants/Apis';
import {ProductAdd} from '../../redux/slice/ProductAddSlice';

import {logMessage, useThunkDispatch} from '../../helpers/helper';
import AsyncStorageWrapper from '../../utils/asyncStorage';

type RootStackParamList = {
  Home: {screen: any};
  ProfileScreen: {screen: any};
};
const useAddImages = () => {
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
  const {log} = logMessage();
  const name = useSelector(
    (state: {ItemsReducer: {Name: string}}) => state.ItemsReducer.Name,
  );
  const description = useSelector(
    (state: {ItemsReducer: {Description: string}}) =>
      state.ItemsReducer.Description,
  );
  const categoryIds = useSelector(
    (state: {ItemsReducer: {CategoryId: []}}) => state.ItemsReducer.CategoryId,
  );
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
    try {
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
    } catch (error) {
      log.error('erorr in posting Item');
    }
  };

  const handleremove = () => {
    setSelectedImage('');
  };
  const handleRemoveImage = (index: number) => {
    setImageUrls(prevUrls => prevUrls.filter((url, i) => i !== index));
    setIsLoading(false);
  };

  useEffect(() => {
    const getImageUrls = async () => {
      const url = await AsyncStorageWrapper.getItem('url');
      if (url) {
        const imageUrls = Array.from({length: 10}, (_, index) => {
          return `${url}/file${index + 1}`;
        });
        imageUrls(imageUris);
      }
    };
    getImageUrls();
  }, [imageUris]);
  const pickImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
      },
      async response => {
        if (response.didCancel) {
          log.info('image not selected');
        } else if (response.errorMessage) {
          log.info('image not selected');
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
            const token = await AsyncStorageWrapper.getItem('token');
            console.log(categoryIds, subcategoryIds);
            const result = await fetch(
              `${baseUrl}/file/uploadProductImage?categoryId=${1}&subcategoryId=${1}`,
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
              console.log('response', res);

              setImageUrls(prevUrls => [...prevUrls, ...res.urls]);
              setIsLoading(false);
            } else {
              setIsLoading(true);
            }
          } catch (error) {
            log.info('error during image upload');
          }
        }
      },
    );
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
    handlePriceChange,
    handleQuantityChange,
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
