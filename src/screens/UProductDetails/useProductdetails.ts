/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef, useState} from 'react';
import {ProductsById} from '../../constants/Apis';
import ApiService from '../../network/network';
import {useSelector} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';
import {ScrollView, Share} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {CartAdd} from '../../redux/slice/CartAddSlice';
import {useThunkDispatch} from '../../helpers/helper';

const useProductdetails = (product: {id: any; imageUrl: string | any[]}) => {
  const isError = useSelector(
    (state: {cartAdd: {error: any}}) => state.cartAdd.error,
  );
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
  const [shareData, setshareData] = useState({});
  const {dispatch} = useThunkDispatch();
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
  console.log('carterrors', isError?.status);
  console.log('cart status if true', isData?.status);
  const handleSubmit = () => {
    try {
      const Item = {
        productId: product.id,
        quantity: quantity,
        rentalEndDate: rentalEndDate.toISOString(),
        rentalStartDate: rentalStartDate.toISOString(),
      };
      dispatch(CartAdd(Item));
      if (isData.status === 201) {
        opennModal();
      } else {
        openModal();
      }
    } catch (error) {
      console.log(error);
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
    const result = await ApiService.get(`${ProductsById}/${product.id}`);
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
    try {
      const getLink = await generateLink();
      if (getLink) {
        Share.share({
          message: getLink,
        });
      } else {
        console.log('Error generating link.');
      }
    } catch (error) {
      console.log('Share Error: ', error);
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
    scrollTimerRef,
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
