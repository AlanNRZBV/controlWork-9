import { IApiCategory, ICategory, IOptions } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import { uploadCategory} from './categoryThunks.ts';
import { options } from '../../../constants/constants.ts';

interface CategoryFormState {
  category:ICategory,
  selected: IOptions | null,
  editId: string
  isLoading: boolean,
  isEditing: boolean,
  isVisible: boolean
}

export const initialState: CategoryFormState={
  category:{type:'',name:''},
  selected: null,
  editId:'',
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
      state.selected = action.payload
      if (action.payload) {
        state.category.type = action.payload.value;
      }
    },
    addCategory: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.category.name = action.payload
    },
    editCategory:(state, action:PayloadAction<IApiCategory>)=>{
      const editCat = action.payload
      state.editId = editCat.id
      state.selected = options.find(option => option.value === editCat.type) || null;
      state.category.name = editCat.name
      state.isEditing = true
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
export const {toggleVisibility, setSelectedOption, addCategory, resetForm, editCategory}=categoryFormSlice.actions
export const categoryFormState = (state: RootState)=>state.categoryForm.category
export const categoryFormSelected = (state: RootState)=>state.categoryForm.selected
export const isCategoryFormLoading = (state: RootState)=>state.categoryForm.isLoading
export const isCategoryFormVisible = (state: RootState)=>state.categoryForm.isVisible
export const isCategoryFormEditing = (state:RootState)=>state.categoryForm.isEditing