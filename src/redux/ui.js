import { createReducer } from '@reduxjs/toolkit';

//
// Action types
//
const SET_LOADING = 'actSetLoading';
const UNSET_LOADING = 'actUnsetLoading';

//
// Actions
//
export const actSetLoading = ({ key, namespace }) => ({
  key,
  type: `${namespace}/${SET_LOADING}`,
});

export const actUnsetLoading = ({ key, namespace }) => ({
  key,
  type: `${namespace}/${UNSET_LOADING}`,
});

//
// Reducer
//
const initialState = {
  loading: {},
  cache: {},
};

const uiReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      (action) => action.type.endsWith(`/${SET_LOADING}`),
      (state, action) => {
        state.loading[action.key] = true;
        state.cache[action.key] = Date.now();
      },
    )
    .addMatcher(
      (action) => action.type.endsWith(`/${UNSET_LOADING}`),
      (state, action) => { state.loading[action.key] = false; },
    );
});

//
// Selectors
//
export const selectCache = (state, key) => {
  const cache = state.ui.cache[key];
  if (!cache) {
    return false;
  }
  return (Date.now() - cache) < (10 * 60 * 1000);
};

export const selectLoading = (state, key) => {
  const loading = state.ui.loading[key];
  return loading === undefined ? true : loading;
};

export default uiReducer;
