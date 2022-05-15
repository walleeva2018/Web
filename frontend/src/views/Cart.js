import { useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  const UpdateCartItem = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.quantity < quantity) {
      window.alert('THis product is out of stock');
      return;
    }
    ctxdispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  const RemoveItem = (item) => {
    ctxdispatch({ type: 'Remove_from_cart', payload: item });
  };
  const Pay = () => {
    navigate('/signin');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="page-color">Your Cart</h1>
      <Row>
        <Col md={8}>
          {cartItem.length === 0 ? (
            <p>
              {' '}
              Cart Is Empty Shop <Link to="/">Here </Link>{' '}
            </p>
          ) : (
            <ListGroup>
              {cartItem.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() => UpdateCartItem(item, item.quantity - 1)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() => UpdateCartItem(item, item.quantity + 1)}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light" onClick={() => RemoveItem(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              Total Amount :{' '}
              {cartItem.reduce((a, c) => a + c.quantity * c.price, 0)}
              <br />
              Total Item : {cartItem.reduce((a, c) => a + c.quantity, 0)}
            </Card.Body>
          </Card>

          <Button disabled={cartItem.quantity === 0} onClick={Pay}>
            Pay Now
          </Button>
        </Col>
      </Row>
    </div>
  );
}
