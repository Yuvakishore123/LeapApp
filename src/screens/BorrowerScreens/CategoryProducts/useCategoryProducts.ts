import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

// Importing network-related functionalities
import ApiService from '../../../network/network';

// Importing API routes
import {categoryProductsUrl} from '../../../constants/apiRoutes';

// Importing Redux action for adding a product to the wishlist
import {postProductToAPI} from '../../../redux/reducers/AddtoWishlist';

// Custom hook for managing category products and wishlist functionality
const useCategoryProducts = (subcategoryId: number) => {
  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // State variables for subcategories, wishlist, and image loading
  const [subcategories, setSubcategories] = useState([]);
  const [wishlistList, setWishlistList] = useState<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Effect to fetch subcategories based on the provided subcategoryId
  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await ApiService.get(
        `${categoryProductsUrl}/${subcategoryId}`,
      );
      setSubcategories(response);
    };
    fetchSubcategories();
  }, [subcategoryId]);

  // Function to toggle wishlist status for a specific item
  const toggleWishlist = (itemId: number) => {
    if (wishlistList.includes(itemId)) {
      setWishlistList(wishlistList.filter(id => id !== itemId));
    } else {
      setWishlistList([...wishlistList, itemId]);

      // Fetching the selected item from the subcategories array
      const selectedItem = subcategories.find(
        (item: any) => item.id === itemId,
      );

      // Dispatching an action to add the selected item to the wishlist
      if (selectedItem) {
        dispatch(postProductToAPI(selectedItem) as any);
      }
    }
  };

  // Returning values for external use
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
