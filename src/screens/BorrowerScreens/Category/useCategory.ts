import {useEffect} from 'react';

// Importing Redux-related functionalities
import {
  fetchCategoriesData,
  selectCategoryData,
  selectCategoryLoading,
} from '../../../redux/slice/categorySlice';
import {useDispatch, useSelector} from 'react-redux';

// Navigation-related imports
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Defining the navigation stack parameters
type RootStackParamList = {
  Subcategory: {categoryId: string};
};

// *Custom hook for managing category-related data and actions
const useCategory = () => {
  // *Accessing navigation functions
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Selecting category data and loading state from the Redux store
  const data = useSelector(selectCategoryData);
  const loading = useSelector(selectCategoryLoading);

  //* Accessing dispatch function from Redux
  const dispatch = useDispatch();

  //* Effect to fetch category data on component mount
  useEffect(() => {
    dispatch(fetchCategoriesData() as any);
  }, [dispatch]);

  // *Function to handle navigation to subcategories with a specific categoryId
  const handleCategoryData = (categoryId: string) => {
    navigation.navigate('Subcategory', {categoryId});
  };

  // Returning values for external use
  return {
    loading,
    data,
    handleCategoryData,
    dispatch,
  };
};

export default useCategory;
