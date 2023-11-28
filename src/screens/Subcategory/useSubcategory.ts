import {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import ApiService from 'network/network';
import {subCategoryUrl} from 'constants/apiRoutes';

type RootStackParamList = {
  CategoryProducts: {
    subcategoryId: string;
  };
};

export const useSubcategory = (categoryId: string) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await ApiService.get(`${subCategoryUrl}/${categoryId}`);
      const subcategoriesData = response;
      setSubcategories(subcategoriesData);
      setLoading(false);
    };

    fetchSubcategories();
  }, [categoryId]);

  const handleSubcategoryPress = (subcategoryId: string) => {
    navigation.navigate('CategoryProducts', {
      subcategoryId: subcategoryId,
    });
  };

  return {
    subcategories,
    loading,
    handleSubcategoryPress,
  };
};
