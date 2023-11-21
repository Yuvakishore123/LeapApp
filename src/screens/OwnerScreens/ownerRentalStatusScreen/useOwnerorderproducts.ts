/* eslint-disable react-hooks/exhaustive-deps */
import {useSelector} from 'react-redux';
import {
  ownerorderproducts,
  selectOwnerRentalProducts,
  selectOwnerRentalProductsLoading,
} from '../../../redux/slice/OwnerorderproductSlice';
import {useThunkDispatch} from '../../../helpers/helper';
import {useEffect} from 'react';
const useOwnerorderproducts = () => {
  const {dispatch} = useThunkDispatch();

  const ownerrentalproducts = useSelector(selectOwnerRentalProducts);
  const isLoading = useSelector(selectOwnerRentalProductsLoading);
  useEffect(() => {
    dispatch(ownerorderproducts('Order placed') as any);
  }, [ownerorderproducts]);

  return {
    ownerrentalproducts,
    isLoading,
  };
};
export default useOwnerorderproducts;
