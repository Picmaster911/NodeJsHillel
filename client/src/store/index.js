import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/reducer'

const rootReducer = combineReducers({
    authSlice,
});
const store = configureStore({ reducer: rootReducer });

export default store;
