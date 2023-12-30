import { FC } from 'react';
import { IApiCategory } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteCategory } from './categoriesThunks.ts';
import {
  isCategoriesDeleting,
  isCategoriesLoading,
} from './categoriesSlice.ts';
import { Spinner } from 'react-bootstrap';
import {
  editCategory,
  toggleVisibility,
} from '../Modals/CategoryForm/categoryFormSlice.ts';

const CategoriesItem: FC<IApiCategory> = ({ name, type, id }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isCategoriesLoading);
  const isDeleting = useAppSelector(isCategoriesDeleting);

  let typeStyle;
  if (type === 'expense') {
    typeStyle = 'text-danger';
  } else {
    typeStyle = 'text-success';
  }

  const onDelete = () => {
    dispatch(deleteCategory(id));
  };
  const onEdit = () => {
    const category: IApiCategory = {
      name: name,
      type: type,
      id: id,
    };
    dispatch(editCategory(category));
    dispatch(toggleVisibility());
  };

  return (
    <div className="border border-1 rounded-3 shadow-sm p-3 d-flex mb-3 align-items-center">
      <span className="me-auto">{name}</span>
      <span className={typeStyle}>{type}</span>
      <button
        onClick={onEdit}
        type="button"
        className="btn btn-outline-warning ms-5 me-3"
        disabled={isLoading || isDeleting}
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        type="button"
        className="btn btn-danger"
        disabled={isDeleting}
      >
        {isDeleting ? <Spinner /> : 'Delete'}
      </button>
    </div>
  );
};

export default CategoriesItem;
