import { Container, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  isCategoryFormVisible,
  toggleVisibility,
} from '../Modals/CategoryForm/categoryFormSlice.ts';
import CategoryForm from '../Modals/CategoryForm/CategoryForm.tsx';
import { categoriesState, isCategoriesLoading } from './categoriesSlice.ts';
import CategoriesItem from './CategoriesItem.tsx';
import { useEffect } from 'react';
import { fetchCategories } from './categoriesThunks.ts';

const Categories = () => {
  const dispatch = useAppDispatch();
  const isModalVisible = useAppSelector(isCategoryFormVisible);
  const categories = useAppSelector(categoriesState);
  const isLoading = useAppSelector(isCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onClickHandler = () => {
    dispatch(toggleVisibility());
  };

  return (
    <Container>
      <div className="d-flex justify-content-between mb-3 border-bottom border-1 py-3">
        <span className="fs-4">Categories</span>
      <button
        onClick={onClickHandler}
        type="button"
        className="btn btn-outline-primary"
      >
        add
      </button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        categories.map((item) => (
          <CategoriesItem
            id={item.id}
            type={item.type}
            name={item.name}
            key={item.id}
          />
        ))
      )}

      {isModalVisible ? <CategoryForm /> : <></>}
    </Container>
  );
};

export default Categories;
