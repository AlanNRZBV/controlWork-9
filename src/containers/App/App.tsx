import Navigation from '../../components/Navigation/Navigation.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from '../../components/Categories/Categories.tsx';
import Transactions from '../../components/Transactions/Transactions.tsx';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
