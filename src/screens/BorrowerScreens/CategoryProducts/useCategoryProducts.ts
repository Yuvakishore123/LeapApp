import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import ApiService from '../../../network/network';
import {categoryProductsUrl} from '../../../constants/apiRoutes';
import {postProductToAPI} from '../../../redux/reducers/AddtoWishlist';

const useCategoryProducts = (subcategoryId: number) => {
  const dispatch = useDispatch();
  const [subcategories, setSubcategories] = useState([]);
  const [wishlistList, setWishlistList] = useState<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);

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

    toggleWishlist,
    imageLoaded,
    setImageLoaded,
    setSubcategories,
  };
};

export default useCategoryProducts;
