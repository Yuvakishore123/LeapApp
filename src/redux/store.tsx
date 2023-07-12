import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import ProductSlice from './slice/productSlice';
import Reducers from './reducers/reducers';
import {AddressReducers} from './reducers/AddressReducers';
import {ItemsReducer} from './reducers/Additemsreducers';
import SizeReducer from './reducers/sizeReducer';
import GenderReducer from './reducers/GenderReducer';
import Rolereducer from './reducers/Rolereducer';
import CartReducer from './reducers/cartReducer';
import WishlistReducer from './reducers/wishlistReducer';
import UserProductSlice from './slice/userProductSlice';
import wishlistSlice from './slice/wishlistSlice';
import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice';
import editItemSlice from './slice/editItemSlice';
import thunk from 'redux-thunk';
import loginSlice from './slice/loginSlice';

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
  editItem: editItemSlice,
  login: loginSlice,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));
export {createStore};
