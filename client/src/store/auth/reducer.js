import { createSlice } from '@reduxjs/toolkit';
import { moduleName } from './constants';
import { loginUserThunk, logoutUserThunk  } from './thunks';
import setActions from './actions'; // Импортируйте ваш новый action

const initialState = {
  accessToken: null,
  result: null,
  userName: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.userName = payload.userName;
        state.isAuthenticated = true;
        state.accessToken = payload.accessToken
      })
      .addCase(setActions.setUserToLocal, (state, { payload }) => {
        state = payload;
      })
      .addCase(setActions.setLogOut, (state, { payload }) => {
        state.result = null;
        state.userName = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state, { payload }) => {
        state.result = payload.result;
        state.userName = payload.userName;
        state.isAuthenticated = true;
      })
  },
});

export default authSlice.reducer;