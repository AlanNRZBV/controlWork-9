import { NavLink } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

const Navigation = () => {
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
            <button type="button" className="btn btn-primary">Add</button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
