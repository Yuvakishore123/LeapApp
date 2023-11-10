/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef, useState} from 'react';
import ApiService from '../../../network/network';
import {useSelector} from 'react-redux';
import {fetchCartProducts} from '../../../redux/slice/cartSlice';
import {ScrollView, Share} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {CartAdd} from '../../../redux/slice/CartAddSlice';
import {useNavigationProp, useThunkDispatch} from '../../../helpers/helper';
import {listProductsById} from '../../../constants/apiRoutes';
import Toast from 'react-native-toast-message';

const useProductdetails = (product: {
  id: any;
  imageUrl: string | any[];
  availableQuantities: number;
}) => {
  const isData = useSelector(
    (state: {cartAdd: {data: any}}) => state.cartAdd.data,
  );
  const isError = useSelector(
    (state: {cartAdd: {isError: boolean}}) => state.cartAdd.isError,
  );
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showwModal, settShowModal] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [_shareData, setshareData] = useState({});
  const {dispatch} = useThunkDispatch();
  const {navigation} = useNavigationProp();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const handleDecrement = () => {
    if (quantity === 1) {
      setIsMinusDisabled(true);
    } else {
      setQuantity(quantity - 1);
      setIsPlusDisabled(false);
    }
  };

  const handleIncrement = () => {
    if (product.availableQuantities === quantity) {
      setIsPlusDisabled(true);
    }
    setQuantity(quantity + 1);
    setIsMinusDisabled(false);
  };
  const handleSubmit = () => {
    const Item = {
      productId: product.id,
      quantity: quantity,
      rentalEndDate: rentalEndDate.toISOString(),
      rentalStartDate: rentalStartDate.toISOString(),
    };
    dispatch(CartAdd(Item));
  };

  const openModal = () => {
    setShowModal(true);
  };
  const opennModal = () => {
    settShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(fetchCartProducts());
    productsData();
  };

  const closeeModal = () => {
    settShowModal(false);
  };

  useEffect(() => {
    productsData();
  }, []);

  const productsData = async () => {
    const result = await ApiService.get(`${listProductsById}/${product.id}`);
    console.log('result is :', result);
    setshareData(result);
  };
  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://clothesrentalapp.page.link/eNh4?productId=${product.id}`,
          domainUriPrefix: 'https://clothesrentalapp.page.link',
          android: {
            packageName: 'com.clothesrentalapp',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('Link: ', link);
      return link;
    } catch (error) {
      console.log('error', error);
    }
  };
  const shareProduct = async () => {
    const getLink = await generateLink();
    if (getLink) {
      Share.share({
        message: getLink,
      });
    } else {
      showToast();
    }
  };
  const scrollToNextImage = useCallback(() => {
    if (scrollViewRef.current) {
      const nextIndex =
        activeIndex === product.imageUrl.length - 1 ? 0 : activeIndex + 1;
      scrollViewRef.current.scrollTo({x: nextIndex * 405, animated: true});
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, product.imageUrl]);

  const startScrollTimer = useCallback(() => {
    stopScrollTimer();
    scrollTimerRef.current = setInterval(scrollToNextImage, 2000);
  }, [scrollToNextImage]);

  useEffect(() => {
    startScrollTimer();
    return () => {
      stopScrollTimer();
    };
  }, [activeIndex, startScrollTimer]);

  const stopScrollTimer = () => {
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };
  const showToast = () => {
    Toast.show({
      text1: 'Error generating link.',
      type: 'error',
    });
  };
  const errorToast = () => {
    Toast.show({
      text1: 'An error occurred while sharing the product. Please try again.',
      type: 'error',
    });
  };
  useEffect(() => {
    handleError();
  }, [isError]);
  const handleError = () => {
    if (isError) {
      opennModal();
    }
  };

  const handleScroll = () => {
    startScrollTimer();
  };
  const handlegoBack = () => {
    navigation.goBack();
  };

  return {
    rentalStartDate,
    setRentalStartDate,
    rentalEndDate,
    setRentalEndDate,
    quantity,
    setQuantity,
    showModal,
    setShowModal,
    showwModal,
    settShowModal,
    isMinusDisabled,
    imageLoaded,
    setImageLoaded,
    setIsMinusDisabled,
    isPlusDisabled,
    setIsPlusDisabled,
    handleDecrement,
    handleIncrement,
    handleSubmit,
    closeModal,
    closeeModal,
    scrollTimerRef,
    scrollToNextImage,
    scrollViewRef,
    shareProduct,
    setActiveIndex,
    activeIndex,
    startScrollTimer,
    stopScrollTimer,
    handleScroll,
    generateLink,
    handlegoBack,
    openModal,
    opennModal,
    handleError,
    isData,
    errorToast,
  };
};

export default useProductdetails;