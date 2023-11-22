import {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import ApiService from '../../../network/network';
import {subCategoryUrl} from '../../../constants/apiRoutes';

// Define the navigation stack parameters
type RootStackParamList = {
  CategoryProducts: {
    subcategoryId: string;
  };
};

// Custom hook for managing subcategory-related functionality
const useSubcategory = (categoryId: string) => {
  // State to store subcategories data
  const [subcategories, setSubcategories] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // Access the navigation object
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Effect to fetch subcategories data based on the categoryId
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        // Make an API request to get subcategories data
        const response = await ApiService.get(
          `${subCategoryUrl}/${categoryId}`,
        );

        // Update the state with the received subcategories data
        setSubcategories(response);
        // Set loading to false, indicating that the data has been fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    // Call the function to fetch subcategories data
    fetchSubcategories();
  }, [categoryId]);

  // Function to handle pressing a subcategory item
  const handleSubcategoryPress = (subcategoryId: string) => {
    // Navigate to the 'CategoryProducts' screen with the selected subcategory
    navigation.navigate('CategoryProducts', {
      subcategoryId: subcategoryId,
    });
  };

  // Return the necessary values and functions for the component using this hook
  return {
    subcategories,
    loading,
    handleSubcategoryPress,
  };
};

export default useSubcategory;
