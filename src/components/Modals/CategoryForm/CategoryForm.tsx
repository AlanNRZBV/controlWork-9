import Backdrop from '../../UI/Backdrop/Backdrop.tsx';
import Select from 'react-select';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import {
  addCategory,
  categoryFormSelected,
  categoryFormState,
  isCategoryFormLoading,
  setSelectedOption,
  toggleVisibility,
} from './categoryFormSlice.ts';
import { IOptions } from '../../../types';
import React from 'react';
import { uploadCategory } from './categoryThunks.ts';

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(categoryFormState);
  const selected = useAppSelector(categoryFormSelected);
  const isLoading = useAppSelector(isCategoryFormLoading);

  const options: IOptions[] = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ];
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(uploadCategory(category));
    dispatch(toggleVisibility());
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    dispatch(addCategory(name));
  };

  const selectOnChangeHandler = (selectedOption: IOptions | null) => {
    console.log('current select value is ', selected?.value)

      dispatch(setSelectedOption(selectedOption));

  };

  const onCloseHandler = () => {
    dispatch(toggleVisibility());
  };

  return (
    <>
      <Form
        onSubmit={submitHandler}
        className="border border-1 rounded-3 p-3 position-absolute top-50 start-50 translate-middle bg-white z-2"
      >
        <Form.Group className="mb-3">
          <Select
            onChange={selectOnChangeHandler}
            options={options}
            value={selected}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category name</Form.Label>
          <Form.Control
            onChange={changeHandler}
            type="text"
            placeholder="Enter category source: Food, Vacation, Salary etc."
            name="name"
            id="name"
            value={category.name}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
        <Button
          onClick={onCloseHandler}
          variant="outline-warning"
          type="button"
          disabled={isLoading}
        >
          Cancel
        </Button>
      </Form>
      <Backdrop />
    </>
  );
};

export default CategoryForm;
