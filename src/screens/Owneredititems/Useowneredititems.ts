/* eslint-disable @typescript-eslint/no-shadow */
import {SetStateAction, useEffect, useState} from 'react';
import {url as baseUrl} from '../../constants/Apis';
import {
  addGenderData,
  addsize,
  removeproducts,
} from '../../redux/actions/Actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import ApiService from '../../network/Network';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  categoryDataUrl,
  disableProductUrl,
  editItemsDataUrl,
  editProductsByIdUrl,
  enableProductUrl,
} from '../../constants/ApiRoutes';
import {logMessage} from 'helpers/Helper';
import asyncStorageWrapper from 'constants/AsyncStorageWrapper';
type RootStackParamList = {
  OwnerProfile: undefined;
};
const Useowneredititems = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [outfitType, setOutfitType] = useState('');
  const [itemType, setItemType] = useState('');
  const [selectedsize, setSelectedsize] = useState('');
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [pref, setPrefill] = useState([]);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedItem] = useState(null);
  const [visible, setViisble] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [_hideId, setHideId] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [outofStock, setOutofstock] = useState(false);
  const [totalQuantity, settotalQuantities] = useState(0);
  const [updatedQuantity, setupdatedquantity] = useState(0);
  const [disabledQuantity, setdisabledQuantity] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const openModal = () => {
    setShowModal(true);
    fetchData();
    setRefreshData(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setRefreshData(false);
  };
  const [Mapdata, setMapdata] = useState('');
  const handleGenderChange = (selectedGender: React.SetStateAction<string>) => {
    setGender(selectedGender);
    dispatch(addGenderData(selectedGender));
  };
  const fetchData = async () => {
    try {
      const response = await ApiService.get(editItemsDataUrl);
      const mappedData = response.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.imageUrl[0],
        disabledQuantities: item.disabledQuantities,
        availableQuantities: item.availableQuantities,
        disabled: item.disabled,
        totalQuantity: item.totalQuantity,
      }));
      setData(mappedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);
  const FetchData = async (editProductId: any) => {
    try {
      const ProductData = await ApiService.get(
        `${editProductsByIdUrl}/${editProductId}`,
      );
      setMapdata(ProductData);
      setName(ProductData.name);
      setPrice(ProductData.price);
      setQuantity(ProductData.totalQuantity);
      setDescription(ProductData.description);
      return ProductData;
    } catch (error) {
      logMessage.error('error in FetchData of Owneredititems :', error);
    }
  };
  // 2nd api call here

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await ApiService.get(categoryDataUrl);
        const categoriesArray = response.map(
          (category: {id: any; categoryName: any}) => ({
            ...category,
            value: category.id,
            label: category.categoryName,
          }),
        );
        setCategoriesData(categoriesArray);
      } catch (error) {
        logMessage.error('error in fetchcategory', error);
      }
    };
    fetchCategoryData();
  }, []);
  const getImageUrl = async () => {
    const url = await asyncStorageWrapper.getItem('url');
    logMessage.info('getImageUrl in useOwneritems', url);
  };
  useEffect(() => {
    getImageUrl();
  }, []);

  const [selectedImage, setSelectedImage] = useState('');
  const [imageUris, setImageUris] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleremove = () => {
    setSelectedImage('');
  };
  useEffect(() => {
    const getImageUrls = async () => {
      const url = await asyncStorageWrapper.getItem('url');
      if (url) {
        const imageUrls = Array.from({length: 10}, (_, index) => {
          return `${url}/file${index + 1}`;
        });
        setImageUrls(imageUrls);
      }
    };
    getImageUrls();
  }, [imageUris]);
  const pickImg = async () => {
    try {
      const token = await asyncStorageWrapper.getItem('token');

      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

      if (response.didCancel) {
        return;
      }

      if (!response) {
        logMessage.error('ImagePicker Error: ');
        return;
      }

      if (!response.assets) {
        logMessage.error('Response assets not found');
        return;
      }

      const images = response.assets.map((imagePath: any) => ({
        uri: imagePath.uri,
        type: 'image/png',
        name: 'image.png',
      }));

      const formData = new FormData();
      images.forEach((file: {uri: any}) => {
        formData.append('file', {
          uri: file.uri,
          type: 'image/png',
          name: 'image.png',
        });
      });

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
        setImageUrls(res.urls);
        setSelectedImage(res.urls);
      } else {
        const res = await result.json();
        logMessage.error('Upload failed', res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventTypeChange = (
    selectedEventType: React.SetStateAction<string>,
  ) => {
    setEventType(selectedEventType);
  };

  const handleOutfitChange = (selectedOutfit: React.SetStateAction<string>) => {
    setOutfitType(selectedOutfit);
  };

  const handleItemTypeChange = (
    selectedItemType: React.SetStateAction<string>,
  ) => {
    setItemType(selectedItemType);
  };
  const handleSizeTypeChange = (selectedSize: SetStateAction<string>) => {
    setSelectedsize(selectedSize);
  };
  const handleedit = async () => {
    try {
      const data = {
        brand: 'addidas',
        categoryIds: [gender],
        color: 'black',
        description: description,
        id: 0,
        imageUrl: imageUrls,
        material: 'fibre',
        name: name,
        price: price,
        totalQuantity: quantity,
        size: selectedsize,
        subcategoryIds: [itemType, outfitType, eventType],
      };

      const response = await ApiService.put(
        `${baseUrl}/product/update/${editProductId}`,
        data,
      );
      logMessage.info('response', response);
      dispatch(addsize(selectedsize));
      navigation.navigate('OwnerProfile');
    } catch (error) {
      logMessage.error('Error in product update');
    }
  };
  const RemoveProducts = async (productId: any) => {
    const token = await asyncStorageWrapper.getItem('token');
    fetch(`${baseUrl}/product/deleteProduct/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(_data => {
        dispatch(removeproducts(productId));
        openModal();
      })
      .catch(error => {
        logMessage.error(error);
      });
  };
  const handleDisableProduct = (item: any) => {
    setIsModalVisible(true);
    setProductQuantity(item.availableQuantities);
    settotalQuantities(item.totalQuantity);
    setSelectedProductId(item.id);
    setdisabledQuantity(item.disabledQuantities);
  };
  const incrementQuantity = () => {
    let maxQuantity = productQuantity;
    if (productQuantity < disabledQuantity && disabledQuantity !== 0) {
      maxQuantity = disabledQuantity;
    }

    if (updatedQuantity >= maxQuantity) {
      setIsPlusDisabled(true);
    } else {
      setupdatedquantity(updatedQuantity + 1);
    }
  };
  const handleRefresh = () => {
    setRefreshData(false);
  };

  const decrementQuantity = () => {
    if (updatedQuantity > 1) {
      setupdatedquantity(updatedQuantity - 1);
    }
  };
  const handleDisablebutton = async (id: any, disableQuantity: number) => {
    if (disableQuantity <= productQuantity) {
      const response = await ApiService.get(
        `${disableProductUrl}${id}&quantity=${disableQuantity}`,
      );
      logMessage.info('handleDisablebutton in useOwneritems', response);
      setOutofstock(true);
      fetchData();
      setRefreshData(true);
    } else {
      logMessage.error('Invalid disable quantity');
    }
    setIsModalVisible(false);
  };

  const handleEnablebutton = async (
    id: any,
    enableQuantity: number,
    disabledQuantity: number,
  ) => {
    if (enableQuantity <= disabledQuantity) {
      const response = await ApiService.get(
        `${enableProductUrl}${id}&quantity=${enableQuantity}`,
      );
      logMessage.info('handleEnablebutton in useOwneritems', response);
      setOutofstock(true);
      fetchData();
      setRefreshData(prevRefreshData => !prevRefreshData);
    } else {
      logMessage.error('Invalid enable quantity');
    }

    setIsModalVisible(false);
  };
  const handleVisibleModal = () => {
    setViisble(!visible);
    setHideId(null);
  };

  return {
    data,
    setGender,
    name,
    handleedit,
    _hideId,
    description,
    setEventType,
    setOutfitType,
    setItemType,
    imageUrls,
    setImageUris,
    selectedImage,
    RemoveProducts,
    handleVisibleModal,
    setHideId,
    closeModal,
    setShowModal,
    showModal,
    handleremove,
    pickImg,
    imageUris,
    handleGenderChange,
    handleEventTypeChange,
    handleOutfitChange,
    handleItemTypeChange,
    setName,
    setDescription,
    setCategoriesData,
    categoriesData,
    handleSizeTypeChange,
    setSelectedsize,
    setPrice,
    price,
    visible,
    pref,
    setViisble,
    setQuantity,
    setEditProductId,
    selectedItem,
    FetchData,
    Mapdata,
    quantity,
    openModal,
    isLoading,
    setIsLoading,
    fetchData,
    setIsModalVisible,
    handleDisablebutton,
    setIsMinusDisabled,
    setIsPlusDisabled,
    incrementQuantity,
    decrementQuantity,
    isModalVisible,
    isMinusDisabled,
    isPlusDisabled,
    productQuantity,
    gender,
    selectedProductId,
    outofStock,
    setOutofstock,
    handleEnablebutton,
    setSelectedProductId,
    setProductQuantity,
    setupdatedquantity,
    setdisabledQuantity,
    totalQuantity,
    updatedQuantity,
    disabledQuantity,
    refreshData,
    setImageUrls,
    setSelectedImage,
    setRefreshData,
    handleRefresh,
    eventType,
    outfitType,
    itemType,
    selectedsize,
    setPrefill,
    handleDisableProduct,
  };
};

export default Useowneredititems;
