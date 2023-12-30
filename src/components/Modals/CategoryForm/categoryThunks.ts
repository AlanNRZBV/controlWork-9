import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../../../types';
import axiosApi from '../../../axiosAPI.ts';

export const uploadCategory = createAsyncThunk<void,ICategory>(
  'categoryForm/upload', async (arg)=>{
    try {
      await axiosApi.post('tracker/categories.json', arg)
    }catch (error){
      console.log('Caught on try - UPLOAD CATEGORY - ', error)
    }
  }
)