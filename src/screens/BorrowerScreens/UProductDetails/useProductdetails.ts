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
  // Decrement the quantity of the product in the cart
  const handleDecrement = () => {
    if (quantity === 1) {
      setIsMinusDisabled(true);
    } else {
      setQuantity(quantity - 1);
      setIsPlusDisabled(false);
    }
  };

  // Increment the quantity of the product in the cart
  const handleIncrement = () => {
    if (product.availableQuantities === quantity) {
      setIsPlusDisabled(true);
    }
    setQuantity(quantity + 1);
    setIsMinusDisabled(false);
  };

  // Handle the submission of the cart item
  const handleSubmit = () => {
    const Item = {
      productId: product.id,
      quantity: quantity,
      rentalEndDate: rentalEndDate.toISOString(),
      rentalStartDate: rentalStartDate.toISOString(),
    };
    dispatch(CartAdd(Item));
    openModal();
    dispatch(fetchCartProducts);
  };

  // Open the main modal
  const openModal = () => {
    setShowModal(true);
  };

  // Open the secondary modal
  const opennModal = () => {
    settShowModal(true);
  };

  // Close the main modal
  const closeModal = () => {
    setShowModal(false);
    dispatch(fetchCartProducts());
    productsData();
  };

  // Close the secondary modal
  const closeeModal = () => {
    settShowModal(false);
  };

  // Fetch product data for the current product
  useEffect(() => {
    productsData();
  }, []);

  // Retrieve product data from the API
  const productsData = async () => {
    const result = await ApiService.get(`${listProductsById}/${product.id}`);
    setshareData(result);
  };

  // Generate a short link for sharing the product
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
    } catch (error) {}
  };

  // Share the product using the generated link
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

  // Scroll to the next image in the product gallery
  const scrollToNextImage = useCallback(() => {
    if (scrollViewRef.current) {
      const nextIndex =
        activeIndex === product.imageUrl.length - 1 ? 0 : activeIndex + 1;
      scrollViewRef.current.scrollTo({x: nextIndex * 405, animated: true});
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, product.imageUrl]);

  // Start the timer for automatic scrolling through images
  const startScrollTimer = useCallback(() => {
    stopScrollTimer();
    scrollTimerRef.current = setInterval(scrollToNextImage, 2000);
  }, [scrollToNextImage]);

  // Set up the timer when the component mounts
  useEffect(() => {
    startScrollTimer();
    return () => {
      stopScrollTimer();
    };
  }, [activeIndex, startScrollTimer]);

  // Stop the automatic scrolling timer
  const stopScrollTimer = () => {
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };

  // Display a toast message for link generation error
  const showToast = () => {
    Toast.show({
      text1: 'Error generating link.',
      type: 'error',
    });
  };

  // Display a toast message for sharing error
  const errorToast = () => {
    Toast.show({
      text1: 'An error occurred while sharing the product. Please try again.',
      type: 'error',
    });
  };

  // Handle scrolling action to restart the timer
  const handleScroll = () => {
    startScrollTimer();
  };

  // Navigate back to the previous screen
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

    isData,
    errorToast,
  };
};

export default useProductdetails;
