// Importing legacy_createStore and applyMiddleware from Redux
import {legacy_createStore as createStore, applyMiddleware} from 'redux';

// Importing redux-thunk middleware
import thunk from 'redux-thunk';

// Importing the combined root reducer from './RootReducer'
import {RootReducers} from './RootReducer';

// Creating the Redux store using legacy_createStore and applying thunk middleware
export const store = createStore(RootReducers, applyMiddleware(thunk));

// Exporting legacy_createStore for potential use outside this module
export {createStore};
