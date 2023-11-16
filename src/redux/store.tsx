import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import ProductSlice from './slice/ProductSlice';
import Reducers from './reducers/Reducers';
import {AddressReducers} from './reducers/AddressReducers';
import {ItemsReducer} from './reducers/Additemsreducers';
import SizeReducer from './reducers/SizeReducer';
import GenderReducer from './reducers/GenderReducer';
import Rolereducer from './reducers/Rolereducer';
import CartReducer from './reducers/CartReducer';
import WishlistReducer from './reducers/WishlistReducer';
import UserProductSlice from './slice/UserProductSlice';
import wishlistSlice from './slice/WishlistSlice';
import cartSlice from './slice/CartSlice';
import orderSlice from './slice/OrderSlice';
import thunk from 'redux-thunk';
import loginSlice from './slice/LoginSlice';
import signupSlice from './slice/SignupSlice';
import categorySlice from './slice/CategorySlice';
import cartUpdateSlice from './slice/CartUpdateSlice';
import cartRemoveSlice from './slice/CartRemoveSlice';
import listAddressSlice from './slice/ListAddressSlice';
import profileDataSlice from './slice/ProfileDataSlice';
import CartAddSlice from './slice/CartAddSlice';
import FliterAnalyticsDataSlice from './slice/FliterAnalyticsDataSlice';
import editProfileSlice from './slice/EditProfileSlice';
import subcategorySlice from './slice/SubcategorySlice';
import editAddressSlice from './slice/EditAddressSlice';
import categoryProductsSlice from './slice/CategoryProductsSlice';
import AddressAddSlice from './slice/AddressAddSlice';
import OwnerOrderProductsSlice from './slice/OwnerorderproductSlice';
export const RootReducers = combineReducers({
  Reducers,
  products: ProductSlice,
  AddressReducers,
  ItemsReducer,
  SizeReducer,
  GenderReducer,
  Rolereducer,
  CartReducer,
  WishlistReducer,
  UserProducts: UserProductSlice,
  WishlistProducts: wishlistSlice,
  CartProducts: cartSlice,
  OrderProducts: orderSlice,
  login: loginSlice,
  signup: signupSlice,
  wishlist: wishlistSlice,
  category: categorySlice,
  cartRemove: cartRemoveSlice,
  cartUpdate: cartUpdateSlice,
  listAddress: listAddressSlice,
  profileData: profileDataSlice,
  cartAdd: CartAddSlice,
  FliterAnalyticsData: FliterAnalyticsDataSlice,
  updatedProfileData: editProfileSlice,
  subcategoryData: subcategorySlice,
  editAddressData: editAddressSlice,
  categoruProduct: categoryProductsSlice,
  AddAddress: AddressAddSlice,
  OwnerRentalproducts: OwnerOrderProductsSlice,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));
export {createStore};
