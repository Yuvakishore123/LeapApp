/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {SetStateAction, useEffect, useState} from 'react';

import {url as baseUrl} from '../../constants/Apis';
import {
  addGenderData,
  addsize,
  removeproducts,
} from '../../redux/actions/actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {launchImageLibrary} from 'react-native-image-picker';
import ApiService from '../../network/network';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  disableProductUrl,
  editItemsDataUrl,
  editProductsByIdUrl,
  enableProductUrl,
} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';
import AsyncStorageWrapper from '../../utils/asyncStorage';
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
  const [pref, _setPrefill] = useState([]);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [categoriesData, setCategoriesData] = useState([]);

  const [outofStock, setOutofstock] = useState(false);
  const [totalQuantity, settotalQuantities] = useState(0);
  const [updatedQuantity, setupdatedquantity] = useState(0);
  const [disabledQuantity, setdisabledQuantity] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const {log} = logMessage();
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
  const handleSelectItem = (item: SetStateAction<null>) => {
    setSelectedItem(item);
  };
  const fetchData = async () => {
    try {
      const response = await ApiService.get(editItemsDataUrl);
      setData(response);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);
  useEffect(() => {
    if (!isModalVisible) {
      setRefreshData(false);
    }
  }, [isModalVisible]);

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
      log.error('error during fetching productData', error);
    }
  };

  const [selectedImage, setSelectedImage] = useState('');
  const [imageUris, setImageUris] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleremove = () => {
    setSelectedImage('');
  };

  const pickImg = async () => {
    try {
      const token = await AsyncStorageWrapper.getItem('token');

      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

      if (response.didCancel) {
        log.info(' image not selected');
        return;
      }

      if (!response) {
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
        log.error('error during displaying images');
      }
    } catch (error) {
      log.error('error during uploading data');
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

      await ApiService.put(`${baseUrl}/product/update/${editProductId}`, data);
      fetchData();
      setRefreshData(true);

      dispatch(addsize(selectedsize));
      navigation.navigate('OwnerProfile');
    } catch (error) {
      log.error('error during editing data', error);
    }
  };
  const RemoveProducts = async (productId: any) => {
    ApiService.delete(`${baseUrl}/product/deleteProduct/${productId}`)
      .then(_data => {
        dispatch(removeproducts(productId));
        openModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // const getOwnerProducts = async () => {
  //   try {
  //     setViisble(true);
  //     const token = await AsyncStorageWrapper.getItem('token');
  //     const response = await axios.get(
  //       `${baseUrl}/product/listByProductId/${editProductId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     setPrefill(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error occurred while getting owner products:', error);
  //     throw error;
  //   }
  // };
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
    try {
      if (disableQuantity <= productQuantity) {
        await ApiService.get(
          `${disableProductUrl}${id}&quantity=${disableQuantity}`,
        );
        setOutofstock(true);
        fetchData();
        setRefreshData(true);
      } else {
        log.error('error during fetching disabling quantity');
      }
    } catch (error) {
      log.error('error in disabling quantity');
    }
    setIsModalVisible(false);
  };

  const handleEnablebutton = async (
    id: any,
    enableQuantity: number,
    disabledQuantity: number,
  ) => {
    try {
      if (enableQuantity <= disabledQuantity) {
        await ApiService.get(
          `${enableProductUrl}${id}&quantity=${enableQuantity}`,
        );
        setOutofstock(true);
        fetchData();
        setRefreshData(prevRefreshData => !prevRefreshData);
      } else {
        log.error('error in enabling quantity');
      }
    } catch (error) {
      log.error('error in enabling quantity');
    }

    setIsModalVisible(false);
  };

  return {
    data,
    setGender,
    name,
    handleedit,
    description,
    setEventType,
    setOutfitType,
    setItemType,
    imageUrls,
    setImageUris,
    selectedImage,
    RemoveProducts,
    closeModal,
    setShowModal,
    showModal,
    handleremove,
    setdisabledQuantity,

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
    setVisible,
    setQuantity,
    handleSelectItem,
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
    totalQuantity,
    settotalQuantities,
    updatedQuantity,
    disabledQuantity,
    refreshData,

    handleRefresh,
    handleDisableProduct,

    eventType,
    outfitType,
    selectedsize,
    itemType,
    setProductQuantity,
    setupdatedquantity,
  };
};

export default Useowneredititems;
