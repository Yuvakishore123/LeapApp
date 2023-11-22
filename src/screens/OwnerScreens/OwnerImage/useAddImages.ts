import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Yup from 'yup';
import {SetStateAction, useState} from 'react';

import {useFormik} from 'formik';

import {addsize} from '../../../redux/actions/AddItemsActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {url as baseUrl} from '../../../constants/Apis';
import {ProductAdd} from '../../../redux/slice/ProductAddSlice';

import {logMessage, useThunkDispatch} from '../../../helpers/helper';
import AsyncStorageWrapper from '../../../utils/asyncStorage';
import {
  selectItemsData,
  selectItemsDataCategories,
  selectItemsDataDescription,
  selectItemsDataSubcategory,
} from '../../../../src/redux/reducers/Additemsreducers';

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
  const name = useSelector(selectItemsData);
  const description = useSelector(selectItemsDataDescription);
  const categoryIds = useSelector(selectItemsDataSubcategory);
  const subcategoryIds = useSelector(selectItemsDataCategories);
  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal and navigate to the 'OwnerHome' screen
  const closeModal = () => {
    navigation.navigate('Home', {screen: 'OwnerHome'});
    setShowModal(false);
  };

  // Validation schema for adding items
  const AdditemsvalidationSchema = Yup.object().shape({
    size: Yup.string().required('Size is required'),
    price: Yup.number()
      .required('Price is required')
      .min(100, 'Price must be greater than 100'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be greater than zero'),
  });

  // Handler for changing the selected size type
  const handleSizeTypeChange = (selectedSize: SetStateAction<string>) => {
    setSelectedsize(selectedSize);
    formik.setFieldValue('size', selectedSize);
  };

  // Handler for changing the price
  const handlePriceChange = (value: any) => {
    setPrice(value);
    formik.setFieldValue('price', value);
  };

  // Handler for selecting an image
  const handleSelectedImage = (image: any) => {
    setSelectedImage(image);
    formik.setFieldValue('image', image.url);
  };

  // Handler for changing the quantity
  const handleQuantityChange = (value: any) => {
    setQuantity(value);
    formik.setFieldValue('quantity', value);
  };

  // Handler for onBlur event
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };

  // Handler for navigating back to the previous screen
  const onHandleOwnerItems = () => {
    navigation.goBack();
  };

  // Handler for posting data (adding a product)
  const postData = async () => {
    // Prepare product data
    const Data = {
      brand: 'adiddas',
      categoryIds: categoryIds,
      color: 'black',
      name: name,
      description: description,
      id: 0,
      imageUrl: imageUrls,
      material: 'fibre',
      price: price,
      totalQuantity: quantity,
      size: selectedsize,
      subcategoryIds: subcategoryIds,
    };

    // Dispatch action to add product
    dispatch(ProductAdd(Data));
    dispatch(addsize(selectedsize));
    openModal();
  };

  // Handler for removing the selected image
  const handleremove = () => {
    setSelectedImage('');
  };

  // Handler for removing an image from the imageUrls state
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

  // Formik hook for handling form state and submission
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
    quantity,
    price,
    setImageUrls,
  };
};
export default useAddImages;
