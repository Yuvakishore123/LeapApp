import {useState, useEffect, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {postProductToAPI} from '../../redux/actions/Actions';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import ApiService from '../../network/Network';
import {categoryProductsUrl} from '../../constants/ApiRoutes';

const useCategoryProducts = (subcategoryId: number) => {
  const dispatch = useDispatch();
  const [subcategories, setSubcategories] = useState([]);
  const [wishlistList, setWishlistList] = useState<number[]>([]);
  const {colorScheme, getContainerStyle} = useContext(ColorSchemeContext);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await ApiService.get(
        `${categoryProductsUrl}/${subcategoryId}`,
      );
      setSubcategories(response);
    };
    fetchSubcategories();
  }, [subcategoryId]);

  const toggleWishlist = (itemId: number) => {
    if (wishlistList.includes(itemId)) {
      setWishlistList(wishlistList.filter(id => id !== itemId));
    } else {
      setWishlistList([...wishlistList, itemId]);
      const selectedItem = subcategories.find(
        (item: any) => item.id === itemId,
      );
      if (selectedItem) {
        dispatch(postProductToAPI(selectedItem) as any);
      }
    }
  };

  return {
    subcategories,
    wishlistList,
    setWishlistList,
    setSubcategories,
    colorScheme,
    toggleWishlist,
    getContainerStyle,
  };
};

export default useCategoryProducts;
