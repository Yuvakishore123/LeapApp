/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ownerorderproducts} from '../../redux/slice/OwnerorderproductSlice';
import {useThunkDispatch} from '../../helpers/helper';
const useOwnerorderproducts = () => {
  const {dispatch} = useThunkDispatch();

  const ownerrentalproducts = useSelector(
    (state: {OwnerRentalproducts: {data: any}}) =>
      state.OwnerRentalproducts.data,
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const isLoading = useSelector(
    (state: {OwnerRentalproducts: {isLoader: boolean}}) =>
      state.OwnerRentalproducts.isLoader,
  );
  useEffect(() => {
    dispatch(ownerorderproducts('Order placed') as any);
  }, [ownerorderproducts]);

  return {
    ownerrentalproducts,
    isLoading,
    imageLoaded,
    setImageLoaded,
  };
};
export default useOwnerorderproducts;
