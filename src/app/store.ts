import {configureStore} from "@reduxjs/toolkit";
import { categoryFormReducer } from '../components/Modals/CategoryForm/categoryFormSlice.ts';
import { categoriesReducer } from '../components/Categories/categoriesSlice.ts';
import { transactionReducer } from '../components/Modals/TransactionForm/transactionFormSlice.ts';

export const store = configureStore({
  reducer:{
    categoryForm: categoryFormReducer,
    categories: categoriesReducer,
    transaction: transactionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;