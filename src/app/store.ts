import {configureStore} from "@reduxjs/toolkit";
import { categoryFormReducer } from '../components/Modals/CategoryForm/categoryFormSlice.ts';
import { categoriesReducer } from '../components/Categories/categoriesSlice.ts';

export const store = configureStore({
  reducer:{
    categoryForm: categoryFormReducer,
    categories: categoriesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;