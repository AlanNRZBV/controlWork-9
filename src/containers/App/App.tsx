import Navigation from '../../components/Navigation/Navigation.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from '../../components/Categories/Categories.tsx';

function App() {

  return (
    <>
      <header>
        <Navigation/>
      </header>
      <main>
        <Routes>
          <Route path="/categories" element={<Categories/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
