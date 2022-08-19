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
import Signup from './views/Signup';
import Payment from './views/Payment';
import PlaceOrder from './views/PlaceOrder';
import Order from './views/Order';
import OrderHistory from './views/OrderHistory';
import Profile from './views/Profile';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <div className="page-color">
            <Navbar bg="dark" expand="lg">
              <Container>
                <Link to="/"> SARAZ</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto w-100 justify-content-end">
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
                          <Link to="/orderhistory">
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
                </Navbar.Collapse>
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
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/orderhistory" element={<OrderHistory />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/profile" element={<Profile />} />
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
