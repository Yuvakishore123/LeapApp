import {useEffect} from 'react';

import {
  categoryLoadingreducer,
  categoryreducer,
  fetchCategoriesData,
} from '../../redux/slice/CategorySlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getsubcategoryData} from '../../redux/slice/SubcategorySlice';
type RootStackParamList = {
  Subcategory: {categoryId: string};
};
const useCategory = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const data = useSelector(categoryreducer);
  const loading = useSelector(categoryLoadingreducer);
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
