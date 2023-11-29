import {useEffect} from 'react';

import {
  CategoryDataReducer,
  categoryLoadingReducer,
  fetchCategoriesData,
} from '../../redux/slice/categorySlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getsubcategoryData} from '../../redux/slice/subcategorySlice';
type RootStackParamList = {
  Subcategory: {categoryId: string};
};
const useCategory = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const data = useSelector(CategoryDataReducer);
  const loading = useSelector(categoryLoadingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesData() as any);
  }, [dispatch]);
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
export default useCategory;
