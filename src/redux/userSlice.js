import { createSlice } from '@reduxjs/toolkit';

import api from '../api';
import desc from '../api/descriptors';

const NAMESPACE = 'user';

const initialState = {};

export const userSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    actSetTheme: (state, { payload }) => {
      state.theme = payload;
    },
    actSetUser: (state, { payload }) => payload,
  },
});

export const { actSetTheme, actSetUser } = userSlice.actions;

//
// Actions
//
const actLogout = () => ({ type: `${NAMESPACE}/logout` });

//
// Selectors
//
export const selectUser = (state) => state.user;

export const selectTheme = (state) => state.user.theme;

//
// Side effects
//
export const postLogout = ({ user, router }) => async (dispatch) => {
  try {
    await api(desc.usersPostLogout());
    const dest = user.username.startsWith('demo@!@') ? '/' : '/users/login';
    await router.push(dest);
    dispatch(actLogout());
  } catch (error) {
    console.error(error);
  }
};

export const patchTheme = ({ theme }) => async (dispatch) => {
  try {
    await api(desc.usersPatchTheme({ theme }));
    dispatch(actSetTheme(theme));
  } catch (error) {
    console.error(error);
  }
};

export default userSlice.reducer;
