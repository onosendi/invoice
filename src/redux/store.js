import { combineReducers, configureStore } from '@reduxjs/toolkit';

import invoiceReducer from './invoiceSlice';
import uiReducer from './ui';
import userReducer from './userSlice';

const combinedReducers = combineReducers({
  invoice: invoiceReducer,
  ui: uiReducer,
  user: userReducer,
});

const reducer = (state, action) => {
  let s = state;
  if (action.type === 'user/logout') {
    s = {};
  }
  return combinedReducers(s, action);
};

const store = configureStore({ reducer });

export default store;
