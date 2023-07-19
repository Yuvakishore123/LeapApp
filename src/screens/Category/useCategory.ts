import {useEffect} from 'react';

import {fetchCategoriesdata} from '../../redux/slice/categorySlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getsubcategoryData} from '../../redux/slice/subcategorySlice';
type RootStackParamList = {
  Subcategory: {categoryId: string};
};
export const useCategory = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const data = useSelector(
    (state: {category: {data: any}}) => state.category.data,
  );
  const loading = useSelector(
    (state: {category: {loading: boolean}}) => state.category.loading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesdata() as any);
  }, []);
  console.log('data here is', data);
  const handleCategoryData = (categoryId: string) => {
    navigation.navigate('Subcategory', {categoryId});
    dispatch(getsubcategoryData(categoryId) as any);
  };

  return {
    loading,
    data,
    handleCategoryData,
  };
};
