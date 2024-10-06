import { createAsyncThunk } from '@reduxjs/toolkit';
import { moduleName } from './constants';
import { controllerPost } from '../../api/controller';


const loginUserThunk = createAsyncThunk(`${moduleName}/login`, async (req) => {
  const data = await controllerPost.post(req,'auth/login');
  return {...data, userName:req.username}
});

const logoutUserThunk = createAsyncThunk(`${moduleName}/logout`, async (req) => {
  const  { data }  = await controllerPost.post(req,'auth/logout');
  return {...data, userName:req.username}
});
export {
  loginUserThunk ,
  logoutUserThunk
};