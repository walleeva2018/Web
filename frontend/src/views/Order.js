import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function Order() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: window.alert(err) });
      }
    };
    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  async function tokenHandler(token) {
    const response = await axios.post('/checkout', {
      token,
      order,
    });
    const { status } = response.data;
    console.log('Response:', response.data);
    const d = 3;
    if (status === 'success') {
      const updatePay = await axios.put('/updatepay', {
        order,
        d,
      });
      console.log(updatePay.isPaid);
      navigate('/bankpayment');
    } else {
      window.alert('Something went wrong ');
    }
  }
  return loading ? (
    <div className="page-color">Loading...</div>
  ) : error ? (
    window.alert(error)
  ) : (
    <div className="page-color">
      <Helmet>
        <title> Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId} </h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city},
              </Card.Text>
              {order.isDelivered ? (
                <div className="success">Delivered with Love</div>
              ) : (
                <div className="danger">Not Delivered </div>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Payment Method:</strong>
                {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <div className="success">Paid</div>
              ) : (
                <div className="danger">Not Paid </div>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup>
                {order.orderItems.map((item) => (
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
                        <span>{item.quantity}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title> Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items price</Col>
                    <Col>{order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>100</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Tax</Col>
                    <Col>{order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {order.isPaid ? (
                    <Button>Already PAID</Button>
                  ) : (
                    <StripeCheckout
                      stripeKey="pk_test_51LZQUTGYTrEwzPzdLZFVLCRpPLE8W9nhjQo9O8jmDmedyG0FlywVGuZyVoc9cKTXLcHrLY45mdUY2TCx4j0dwDaT00xhUW7H8V"
                      token={tokenHandler}
                      amount={order.totalPrice.toFixed(2) * 100}
                      email={userInfo.email}
                      name={order.shippingAddress.fullName}
                    />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
