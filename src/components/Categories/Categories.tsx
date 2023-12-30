import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { isCategoryFormVisible, toggleVisibility } from '../Modals/CategoryForm/categoryFormSlice.ts';
import CategoryForm from '../Modals/CategoryForm/CategoryForm.tsx';

const Categories = () => {

  const dispatch = useAppDispatch()
  const isModalVisible = useAppSelector(isCategoryFormVisible)

  const onClickHandler = ()=>{
    dispatch(toggleVisibility())
  }

  return (
    <Container>
      <button onClick={onClickHandler} type="button" className="btn btn-outline-primary">add</button>
      categories here
      {isModalVisible ? (<CategoryForm/>) : (<></>)}
    </Container>
  );
};

export default Categories;