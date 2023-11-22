/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchProducts,
  selectProductsData,
} from '../../../redux/slice/productSlice';
const Usemyrental = () => {
  //* function to dispacth the products details
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);

  const dispatch = useDispatch();
  const products = useSelector(selectProductsData);

  return {products};
};
export default Usemyrental;
