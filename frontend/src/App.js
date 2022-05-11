import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import Product from './views/Product';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { Store } from './Store';
import Cart from './views/Cart';
import Signin from './views/Signin';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark">
            <Container>
              <Link to="/"> SARAZ</Link>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  <font color="white">Cart</font>
                  {cart.cartItem.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItem.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </Container>
        </main>
        <footer class="text-white bg-dark">
          <div className="text-center">ALL RIGHTS RECEIVED @SUST </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
