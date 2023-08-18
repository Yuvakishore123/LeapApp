/* eslint-disable react-hooks/exhaustive-deps */
import {useSelector} from 'react-redux';
import {ownerorderproducts} from '../../redux/slice/OwnerorderproductSlice';
import {useThunkDispatch} from '../../helpers/helper';
import {useEffect} from 'react';
const useOwnerorderproducts = () => {
  const {dispatch} = useThunkDispatch();
  const ownerrentalproducts = useSelector(
    (state: {OwnerRentalproducts: {data: any}}) =>
      state.OwnerRentalproducts.data,
  );
  const isLoading = useSelector(
    (state: {OwnerRentalproducts: {isLoader: boolean}}) =>
      state.OwnerRentalproducts.isLoader,
  );
  useEffect(() => {
    dispatch(ownerorderproducts() as any);
  }, []);
  return {
    ownerrentalproducts,
    isLoading,
  };
};
export default useOwnerorderproducts;
