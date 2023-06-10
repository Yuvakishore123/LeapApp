/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../../redux/slice/productSlice';
function Usemyrental() {
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);

  const dispatch = useDispatch();
  const products = useSelector(
    (state: {products: {data: any[]}}) => state.products.data,
  );
  console.log(JSON.stringify(products));
  return {products};
}
export default Usemyrental;
