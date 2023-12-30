import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../../../types';
import axiosApi from '../../../axiosAPI.ts';
import { RootState } from '../../../app/store.ts';

export const uploadCategory = createAsyncThunk<void,ICategory>(
  'categoryForm/upload', async (arg)=>{
    try {
      await axiosApi.post('tracker/categories.json', arg)
    }catch (error){
      console.log('Caught on try - UPLOAD CATEGORY - ', error)
    }
  }
)

export const uploadEditedCategory = createAsyncThunk<void ,ICategory, {state:RootState}>(
  'categoryForm/edit', async (arg,thunkAPI)=>{
    try {
      const id = thunkAPI.getState().categoryForm.editId
      await axiosApi.put(`tracker/categories/${id}.json`, arg)
    }catch (error){
      console.log('Caught on try - UPLOAD EDITED POST - ', error)
    }
  }
)