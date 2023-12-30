import Backdrop from '../../UI/Backdrop/Backdrop.tsx';
import Select from 'react-select';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import {
  addCategory,
  categoryFormSelected,
  categoryFormState,
  isCategoryFormEditing,
  isCategoryFormLoading,
  resetForm,
  setSelectedOption,
  toggleVisibility,
} from './categoryFormSlice.ts';
import { IOptions } from '../../../types';
import React from 'react';
import { uploadEditedCategory, uploadCategory } from './categoryThunks.ts';
import { options } from '../../../constants/constants.ts';
import { fetchCategories } from '../../Categories/categoriesThunks.ts';

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(categoryFormState);
  const selected = useAppSelector(categoryFormSelected);
  const isLoading = useAppSelector(isCategoryFormLoading);
  const isEditing = useAppSelector(isCategoryFormEditing);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEditing) {
      try {
        await dispatch(uploadCategory(category));
        dispatch(resetForm());
      } catch (error) {
        console.log('Caught on try - SUBMIT FORM POST- ', error);
      }
    } else {
      try {
        await dispatch(uploadEditedCategory(category));
        await dispatch(fetchCategories());

        dispatch(resetForm());
      } catch (error) {
        console.log('Caught on try - SUBMIT FORM PUT- ', error);
      }
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    dispatch(addCategory(name));
  };

  const selectOnChangeHandler = (selectedOption: IOptions | null) => {
    dispatch(setSelectedOption(selectedOption));
  };

  const onCloseHandler = () => {
    dispatch(toggleVisibility());
  };

  return (
    <>
      <Form
        onSubmit={submitHandler}
        className="border border-1 rounded-3 p-3 position-absolute top-50 start-50 translate-middle bg-white z-2 w-50 d-flex flex-column"
      >
        <Form.Group className="mb-3">
          <Form.Label>Category type</Form.Label>
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
        <div className="align-self-center">
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="me-5"
          >
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
        </div>
      </Form>
      <Backdrop />
    </>
  );
};

export default CategoryForm;
