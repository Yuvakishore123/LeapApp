import {useEffect} from 'react';

import {fetchCategoriesData} from '../../../redux/slice/categorySlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Subcategory: {categoryId: string};
};
const useCategory = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const data = useSelector(
    (state: {category: {data: any}}) => state.category.data,
  );
  const loading = useSelector(
    (state: {category: {loading: boolean}}) => state.category.loading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesData() as any);
  }, [dispatch]);

  const handleCategoryData = (categoryId: string) => {
    navigation.navigate('Subcategory', {categoryId});
  };

  return {
    loading,
    data,
    handleCategoryData,
    dispatch,
  };
};
export default useCategory;
