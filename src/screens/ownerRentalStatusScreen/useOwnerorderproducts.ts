/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  ownerRentalloadingreducer,
  ownerRentalproductsreducer,
  ownerorderproducts,
} from '../../redux/slice/OwnerorderproductSlice';
import {useThunkDispatch} from '../../helpers/Helper';
const useOwnerorderproducts = () => {
  const {dispatch} = useThunkDispatch();

  const ownerrentalproducts = useSelector(ownerRentalproductsreducer);
  const isLoading = useSelector(ownerRentalloadingreducer);
  useEffect(() => {
    dispatch(ownerorderproducts('Order placed') as any);
  }, [ownerorderproducts]);

  return {
    ownerrentalproducts,
    isLoading,
  };
};
export default useOwnerorderproducts;
