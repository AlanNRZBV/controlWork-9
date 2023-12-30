import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApiCategory, ITransaction } from '../../../types';
import axiosApi from '../../../axiosAPI.ts';

export const fetchTransactionCategories = createAsyncThunk<
  IApiCategory[] | undefined
>('transactionCategories/fetch', async () => {
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
});

export const uploadTransaction = createAsyncThunk<void, ITransaction>(
  'transaction/upload',
  async (arg) => {
    try {
      await axiosApi.post('tracker/transactions.json', arg);
    } catch (error) {
      console.log('Caught on try - UPLOAD TRANSACTION - ', error);
    }
  },
);
