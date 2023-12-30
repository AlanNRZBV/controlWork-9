import { IApiCategory } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCategory, fetchCategories } from './categoriesThunks.ts';
import { RootState } from '../../app/store.ts';

interface CategoriesState {
  categories: IApiCategory[];
  isLoading: boolean;
  isDeleting: boolean;
}

export const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  isDeleting: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<IApiCategory[] | undefined>) => {
        if (action.payload) {
          state.categories = action.payload;
        }
        state.isLoading = false;
      },
    );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(
      deleteCategory.fulfilled,
      (state, action: PayloadAction<string | undefined>) => {
        const id = action.payload;
        if (id) {
          const categories = state.categories.filter((item) => item.id !== id);
          return {
            ...state,
            categories: categories,
            isDeleting: false,
          };
        }
        state.isDeleting = false;
      },
    );
    builder.addCase(deleteCategory.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const categoriesState = (state: RootState) =>
  state.categories.categories;
export const isCategoriesLoading = (state: RootState) =>
  state.categories.isLoading;
export const isCategoriesDeleting = (state: RootState) =>
  state.categories.isDeleting;
