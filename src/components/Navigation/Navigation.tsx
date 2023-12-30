import { NavLink } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks.ts';
import { toggleVisibility } from '../Modals/TransactionForm/transactionFormSlice.ts';

const Navigation = () => {
  const dispatch = useAppDispatch()
  const onClick = ()=>{
    dispatch(toggleVisibility())
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="navbar-brand me-2">
            Finance tracker
          </NavLink>
          <div
            className="d-flex"
          >
            <NavLink to="/categories" className="text-black nav-link fs-4 me-3">
              Categories
            </NavLink>
            <button onClick={onClick} type="button" className="btn btn-primary">Add</button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
