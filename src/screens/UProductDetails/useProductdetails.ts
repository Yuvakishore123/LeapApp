/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef, useState} from 'react';
import ApiService from '../../network/network';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';
import {ScrollView, Share} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {CartAdd} from '../../redux/slice/CartAddSlice';
import {logMessage} from '../../helpers/helper';
import {listProductsById} from '../../constants/apiRoutes';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {HTTP_STATUS_CODES} from 'constants/HttpStatusCode';

const useProductdetails = (product: {
  id: any;
  imageUrl: string | any[];
  availableQuantities: number;
}) => {
  const isData = useSelector(
    (state: {cartAdd: {data: any}}) => state.cartAdd.data,
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
  const dispatch = useDispatch();
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
    try {
      const Item = {
        productId: product.id,
        quantity: quantity,
        rentalEndDate: rentalEndDate.toISOString(),
        rentalStartDate: rentalStartDate.toISOString(),
      };
      dispatch(CartAdd(Item) as any);
      if (isData.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        opennModal();
      } else {
        openModal();
      }
    } catch (error) {
      logMessage.error('error in adding product to cart', error);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  const opennModal = () => {
    settShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(fetchCartProducts() as any);
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
      return link;
    } catch (error) {
      logMessage.error('error in generating link to share products', error);
    }
  };
  const shareProduct = async () => {
    try {
      const getLink = await generateLink();
      if (getLink) {
        Share.share({
          message: getLink,
        });
      } else {
        showToast();
      }
    } catch (error) {
      errorToast();
    }
  };
  const scrollToNextImage = useCallback(() => {
    if (scrollViewRef.current) {
      const nextIndex =
        activeIndex === product.imageUrl.length - 1 ? 0 : activeIndex + 1;
      scrollViewRef.current.scrollTo({x: nextIndex * 405, animated: true});
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, product?.imageUrl]);

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

  const handleScroll = () => {
    startScrollTimer();
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
    CartAdd,
    openModal,
    opennModal,
    scrollTimerRef,
    generateLink,
    scrollToNextImage,
    scrollViewRef,
    shareProduct,
    setActiveIndex,
    activeIndex,
    startScrollTimer,
    stopScrollTimer,
    handleScroll,
  };
};

export default useProductdetails;
