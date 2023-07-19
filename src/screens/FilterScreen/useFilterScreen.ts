import ApiService from '../../network/network';
import {FilterProduct} from '../../constants/Apis';
import {useState} from 'react';

const useFilterScreen = () => {
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [size, SetSize] = useState('');
  const FilterData = async () => {
    try {
      const response = await ApiService.get(
        `${FilterProduct}?maxPrice=${maximumPrice}&minPrice=${minimumPrice}&size=${size}&subcategoryId=${1}`,
      );
      setFilteredProducts(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      setFilteredProducts([]);
    }
  };

  console.log(minimumPrice);
  console.log(maximumPrice);

  return {
    FilterData,
    minimumPrice,
    maximumPrice,
    setMinimumPrice,
    setMaximumPrice,
    filteredProducts,
    size,
    SetSize,
  };
};

export default useFilterScreen;
