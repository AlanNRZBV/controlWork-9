import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosAPI.ts';
import { IApiCategory } from '../../types';

export const fetchCategories = createAsyncThunk<IApiCategory[] | undefined>(
  'categories/fetch',
  async () => {
    try {
      const response = await axiosApi.get('tracker/categories.json');
      let newCategories: IApiCategory[] = [];
      if (response.data !== null) {
        newCategories = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        return newCategories;
      }
      return newCategories;
    } catch (error) {
      console.log('Caught on try - FETCH CATEGORIES - ', error);
    }
  },
);

export const deleteCategory = createAsyncThunk<string | undefined, string>(
  'categories/delete',
  async (arg) => {
    try {
      await axiosApi.delete(`tracker/categories/${arg}.json`);
      return arg;
    } catch (error) {
      console.log('Caught on try - DELETE CATEGORY - ', error);
    }
  },
);
