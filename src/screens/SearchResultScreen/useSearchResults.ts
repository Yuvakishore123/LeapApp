import {useEffect, useState} from 'react';
import {FilterProduct, categoriesData} from '../../constants/Apis';
import ApiService from '../../network/network';

const useSearchresults = () => {
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const [modalVisible, setModalVisible] = useState(false);
  console.log('adjakjnkmsx', selectedSubCategory);
  const filterData = async () => {
    try {
      const response = await ApiService.get(
        `${FilterProduct}?maxPrice=${maximumPrice}&minPrice=${minimumPrice}&size=${selectedSize}&subcategoryId=${selectedSubCategory}`,
      );

      setFilteredProducts(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      setFilteredProducts([]);
    }
  };
  useEffect(() => {
    SubcategoryData();
  }, []);
  const SubcategoryData = async () => {
    try {
      const response = await ApiService.get(categoriesData);
      console.log('Sub Category data', response);
      const subCategoriesArray = response.map((category: any) => ({
        value: category.id,
        label: category.subcategoryName,
      }));
      setSubcategoriesData(subCategoriesArray);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterButtonPress = () => {
    SubcategoryData();
    setModalVisible(!modalVisible);
  };
  const handleFilterapply = () => {
    filterData();
    setModalVisible(!modalVisible);
  };
  console.log(minimumPrice);
  console.log(maximumPrice);
  return {
    filterData,
    minimumPrice,
    maximumPrice,
    setMinimumPrice,
    setMaximumPrice,
    filteredProducts,
    sizes,
    modalVisible,
    selectedSize,
    setSelectedSize,
    setModalVisible,
    handleFilterButtonPress,
    imageLoaded,
    setImageLoaded,
    SubcategoryData,
    handleFilterapply,
    selectedSubCategory,
    setSelectedSubCategory,
    subcategoriesData,
  };
};
export default useSearchresults;
