import { ICategory, IOptions } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import { uploadCategory } from './categoryThunks.ts';

interface CategoryFormState {
  category:ICategory,
  selected: IOptions | null
  isLoading: boolean,
  isEditing: boolean,
  isVisible: boolean
}

export const initialState: CategoryFormState={
  category:{type:'',name:''},
  selected: null,
  isLoading: false,
  isEditing: false,
  isVisible: false
}

export const categoryFormSlice = createSlice({
  name:'category',
  initialState,
  reducers:{
    toggleVisibility:(state)=>{
      state.isVisible = !state.isVisible
    },
    setSelectedOption: (state, action:PayloadAction<IOptions | null>)=>{
      console.log('setting option with ', action.payload)
      state.selected = action.payload
      console.log('selected state ', state.selected)
      if (action.payload) {
        console.log('category type before ', state.category.type);
        state.category.type = action.payload.value;
        console.log('category type after ', state.category.type);
      }
    },
    addCategory: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.category.name = action.payload
    },
    resetForm: ()=>{
      return initialState
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(uploadCategory.pending, (state)=>{
      state.isLoading = true
    });
    builder.addCase(uploadCategory.fulfilled, (state)=>{
      state.isLoading = false
    })
    builder.addCase(uploadCategory.rejected, (state)=>{
      state.isLoading = false
    })
  }
})

export const categoryFormReducer=  categoryFormSlice.reducer
export const {toggleVisibility, setSelectedOption, addCategory}=categoryFormSlice.actions
export const categoryFormState = (state: RootState)=>state.categoryForm.category
export const categoryFormSelected = (state: RootState)=>state.categoryForm.selected
export const isCategoryFormLoading = (state: RootState)=>state.categoryForm.isLoading
export const isCategoryFormVisible = (state: RootState)=>state.categoryForm.isVisible