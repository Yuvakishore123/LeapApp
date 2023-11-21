import {legacy_createStore as createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {RootReducers} from './RootReducer';

export const store = createStore(RootReducers, applyMiddleware(thunk));
export {createStore};
