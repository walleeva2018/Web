import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { shippingAddress, paymentMethod } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Online Payment'
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div className="page-color">
      <div className="container small-container">
        <Helmet>
          <title> Payment Method </title>
        </Helmet>
        <h1>Choose payment method </h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Online Payment"
              label="Online Payment"
              value="Online Payment"
              checked={paymentMethodName === 'Online Payment'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Cash On Delivery"
              label="Cash On Delivery"
              value="Cash On Delivery"
              checked={paymentMethodName === 'Cash On Delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button className="button" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
