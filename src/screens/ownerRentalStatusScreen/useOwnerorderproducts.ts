/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  OwnerRentalLoadingReducer,
  OwnerRentalProductsReducer,
  ownerorderproducts,
} from '../../redux/slice/OwnerorderproductSlice';
import {useThunkDispatch} from 'helpers/helper';
const useOwnerorderproducts = () => {
  const {dispatch} = useThunkDispatch();

  const ownerrentalproducts = useSelector(OwnerRentalProductsReducer);
  const isLoading = useSelector(OwnerRentalLoadingReducer);
  useEffect(() => {
    dispatch(ownerorderproducts('Order placed') as any);
  }, [ownerorderproducts]);

  return {
    ownerrentalproducts,
    isLoading,
  };
};
export default useOwnerorderproducts;
