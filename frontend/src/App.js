import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import Product from './views/Product';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">SARAZ</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<Product />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
