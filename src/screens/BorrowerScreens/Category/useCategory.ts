import {useEffect} from 'react';

import {
  fetchCategoriesData,
  selectCategoryData,
  selectCategoryLoading,
} from '../../../redux/slice/categorySlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Subcategory: {categoryId: string};
};
const useCategory = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const data = useSelector(selectCategoryData);
  const loading = useSelector(selectCategoryLoading);
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
