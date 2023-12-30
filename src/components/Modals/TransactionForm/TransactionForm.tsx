import { Button, Form, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import { options } from '../../../constants/constants.ts';
import Backdrop from '../../UI/Backdrop/Backdrop.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import {
  addAmount,
  isTransactionFormLoading,
  selectedCategory,
  selectedType,
  setSelectedOptionCategory,
  setSelectedOptionType,
  testDispatch,
  toggleVisibility,
  transactionExpense,
  transactionFormCategoryOptions,
  transactionFormState,
  transactionIncome,
} from './transactionFormSlice.ts';
import { IOptions } from '../../../types';
import React, { useEffect } from 'react';
import {
  fetchTransactionCategories,
  uploadTransaction,
} from './transactionFormThunks.ts';

const TransactionForm = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedType);
  const selectedCat = useAppSelector(selectedCategory);
  const transaction = useAppSelector(transactionFormState);
  const isLoading = useAppSelector(isTransactionFormLoading);
  const categoryOptions = useAppSelector(transactionFormCategoryOptions);
  const income = useAppSelector(transactionIncome);
  const expense = useAppSelector(transactionExpense);

  useEffect(() => {
    dispatch(fetchTransactionCategories());
  }, [dispatch]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(uploadTransaction(transaction));
  };

  const selectOnChangeHandler = (selectedOption: IOptions | null) => {
    dispatch(setSelectedOptionType(selectedOption));
    const input = selectedOption?.value;

    const options: IOptions[] = [];

    if (input) {
      if (input === 'expense') {
        options.push(
          ...expense.map((item) => ({
            value: item.name,
            label: item.name,
          })),
        );
      } else {
        options.push(
          ...income.map((item) => ({
            value: item.name,
            label: item.name,
          })),
        );
      }
    }
    dispatch(testDispatch(options));
  };
  const selectOnChangeCategoryHandler = (selectedOption: IOptions | null) => {
    dispatch(setSelectedOptionCategory(selectedOption));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(addAmount(value));
  };

  const onClose = () => {
    dispatch(toggleVisibility());
  };

  return (
    <>
      <Form
        onSubmit={submitHandler}
        className="border border-1 rounded-3 p-3 position-absolute top-50 start-50 translate-middle bg-white z-2 w-50 d-flex flex-column"
      >
        <Form.Group className="mb-3">
          <Form.Label>Expense / Income</Form.Label>
          <Select
            onChange={selectOnChangeHandler}
            options={options}
            value={selected}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category type</Form.Label>
          <Select
            onChange={selectOnChangeCategoryHandler}
            options={categoryOptions}
            value={selectedCat}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            onChange={changeHandler}
            type="number"
            placeholder="Enter amount"
            name="amount"
            id="amount"
            value={transaction.amount}
            required
          />
        </Form.Group>
        <div className="align-self-center">
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="me-5"
          >
            {isLoading ? <Spinner /> : 'Submit'}
          </Button>
          <Button onClick={onClose} variant="outline-warning" type="button">
            Cancel
          </Button>
        </div>
      </Form>
      <Backdrop />
    </>
  );
};

export default TransactionForm;
