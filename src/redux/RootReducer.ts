import ProductSlice from './slice/productSlice';
import Reducers from './reducers/reducers';

import {ItemsReducer} from './reducers/Additemsreducers';
import SizeReducer from './reducers/sizeReducer';
import GenderReducer from './reducers/GenderReducer';
import Rolereducer from './reducers/Rolereducer';

import WishlistReducer from './reducers/wishlistReducer';
import UserProductSlice from './slice/userProductSlice';
import wishlistSlice from './slice/wishlistSlice';
import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice';

import loginSlice from './slice/loginSlice';
import signupSlice from './slice/signupSlice';
import categorySlice from './slice/categorySlice';
import cartUpdateSlice from './slice/cartUpdateSlice';
import cartRemoveSlice from './slice/cartRemoveSlice';
import listAddressSlice from './slice/listAddressSlice';
import profileDataSlice from './slice/profileDataSlice';
import CartAddSlice from './slice/CartAddSlice';
import FliterAnalyticsDataSlice from './slice/fliterAnalyticsDataSlice';
import editProfileSlice from './slice/editProfileSlice';
import subcategorySlice from './slice/subcategorySlice';
import editAddressSlice from './slice/editAddressSlice';
import categoryProductsSlice from './slice/categoryProductsSlice';
import AddressAddSlice from './slice/AddressAddSlice';
import OwnerOrderProductsSlice from './slice/OwnerorderproductSlice';
import {combineReducers} from 'redux';

export const RootReducers = combineReducers({
  Reducers,
  products: ProductSlice,

  ItemsReducer,
  SizeReducer,
  GenderReducer,
  Rolereducer,

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
