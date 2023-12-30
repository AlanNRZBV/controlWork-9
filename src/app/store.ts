import {configureStore} from "@reduxjs/toolkit";
import { categoryFormReducer } from '../components/Modals/CategoryForm/categoryFormSlice.ts';

export const store = configureStore({
  reducer:{
    categoryForm: categoryFormReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;