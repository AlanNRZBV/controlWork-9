import {
  IApiCategory,
  IExpense,
  IIncome,
  IOptions,
  ITransaction,
} from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store.ts';
import {
  fetchTransactionCategories,
  uploadTransaction,
} from './transactionFormThunks.ts';

interface TransactionFormState {
  transaction: ITransaction;
  selectedType: IOptions | null;
  selectedCategory: IOptions | null;
  categoryOptions: IOptions[];
  expense: IExpense[];
  income: IIncome[];
  switcher: string;
  editId: string;
  isLoading: boolean;
  isEditing: boolean;
  isVisible: boolean;
}

export const initialState: TransactionFormState = {
  transaction: { category: '', amount: 0, createdAt: '' },
  selectedType: null,
  selectedCategory: null,
  expense: [],
  income: [],
  categoryOptions: [],
  switcher: '',
  editId: '',
  isLoading: false,
  isEditing: false,
  isVisible: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    addAmount:(state, {payload: value})=>{
      state.transaction.amount = value
      const now = new Date();
      state.transaction.createdAt = now.toISOString()
    },
    setSelectedOptionType: (state, action: PayloadAction<IOptions | null>) => {
      state.selectedType = action.payload;
      if(action.payload){
      state.switcher = action.payload?.value
      }
    },
    testDispatch:(state, action:PayloadAction<IOptions[]>)=>{
      state.categoryOptions = action.payload
    },
    setSelectedOptionCategory: (
      state,
      action: PayloadAction<IOptions | null>,
    ) => {
      state.selectedCategory = action.payload;

      if(state.switcher === 'expense'){
        const obj = state.expense.find(item => item.name === action.payload?.value)
        if(obj){
          state.transaction.category = obj.id
        }
      }

    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTransactionCategories.fulfilled,
      (state, action: PayloadAction<IApiCategory[] | undefined>) => {
        const categories = action.payload;
        if (categories && state.expense.length < 1 && state.income.length < 1) {
          categories.map((item)=>{
            if(item.type === 'expense'){
              const exp: IExpense = {
                name: item.name,
                id: item.id
              }
              state.expense.push(exp)
            }else{
              const inc: IIncome = {
                name: item.name,
                id: item.id
              }
              state.income.push(inc)
            }
          })
        }
        state.isLoading = false;
      },
    );
    builder.addCase(fetchTransactionCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(uploadTransaction.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(uploadTransaction.fulfilled, (state)=>{
      state.isLoading = false
    })
    builder.addCase(uploadTransaction.rejected, (state)=>{
      state.isLoading = false
    })
  },
});
export const transactionReducer = transactionSlice.reducer;
export const {
  setSelectedOptionType,
  setSelectedOptionCategory,
  toggleVisibility,
  testDispatch,
  addAmount,
} = transactionSlice.actions;
export const selectedType = (state: RootState) =>
  state.transaction.selectedType;
export const selectedCategory = (state: RootState) =>
  state.transaction.selectedCategory;
export const transactionFormState = (state: RootState) =>
  state.transaction.transaction;
export const isTransactionFormLoading = (state: RootState) =>
  state.transaction.isLoading;
export const isTransactionFormVisible = (state: RootState) =>
  state.transaction.isVisible;

export const transactionFormCategoryOptions = (state:RootState)=>state.transaction.categoryOptions
export const transactionExpense = (state:RootState)=>state.transaction.expense
export const transactionIncome = (state:RootState)=>state.transaction.income
