import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import Product from './views/Product';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropDown from 'react-bootstrap/NavDropDown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { Store } from './Store';
import Cart from './views/Cart';
import Signin from './views/Signin';
import Shipping from './views/Shipping';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <div className="page-color">
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
                  {userInfo ? (
                    <NavDropDown
                      title={
                        <span className="page-color">{userInfo.name}</span>
                      }
                      id="basic-nav-dropdown"
                    >
                      <NavDropDown.Item>
                        <Link to="/profile">
                          {' '}
                          <font color="Black">User Profile </font>
                        </Link>
                      </NavDropDown.Item>
                      <NavDropDown.Item>
                        <Link to="/history">
                          {' '}
                          <font color="Black">Order history </font>
                        </Link>{' '}
                      </NavDropDown.Item>
                      <NavDropDown.Divider />
                      <Link
                        to="#signout"
                        className="dropdown-item"
                        onClick={signoutHandler}
                      >
                        <font color="black">Sign Out </font>
                      </Link>
                    </NavDropDown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      <font color="white">Sign In </font>
                    </Link>
                  )}
                </Nav>
              </Container>
            </Navbar>
          </div>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/shipping" element={<Shipping />} />
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
