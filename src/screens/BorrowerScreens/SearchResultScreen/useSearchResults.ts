import {useEffect, useState} from 'react';
import {FilterProduct, categoriesData} from '../../../constants/Apis';
import ApiService from '../../../network/network';
import {logMessage} from 'helpers/helper';

const useSearchresults = () => {
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const [modalVisible, setModalVisible] = useState(false);
  const {log} = logMessage();

  const filterData = async () => {
    try {
      const response = await ApiService.get(
        `${FilterProduct}?maxPrice=${maximumPrice}&minPrice=${minimumPrice}&size=${selectedSize}&subcategoryId=${selectedSubCategory}`,
      );

      setFilteredProducts(response);
    } catch (error) {
      setFilteredProducts([]);
    }
  };
  useEffect(() => {
    SubCategoryData();
  }, []);
  const SubCategoryData = async () => {
    try {
      const response = await ApiService.get(categoriesData);
      const subCategoriesArray = response.map((category: any) => ({
        value: category.id,
        label: category.subcategoryName,
      }));
      setSubcategoriesData(subCategoriesArray);
    } catch (error) {
      log.error('error subcatgeory data in searchresultscreen', error);
    }
  };
  const handleFilterButtonPress = () => {
    SubCategoryData();
    setModalVisible(!modalVisible);
  };
  const handleFilterapply = () => {
    filterData();
    setModalVisible(!modalVisible);
  };

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
    SubCategoryData,
    handleFilterapply,
    selectedSubCategory,
    setSelectedSubCategory,
    subcategoriesData,
    setSubcategoriesData,
  };
};
export default useSearchresults;