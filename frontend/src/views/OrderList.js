import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderList() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/orders/getall`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: window.alert(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="page-color">
      <Helmet>
        <title> Order List </title>
      </Helmet>
      <h1> Order List </h1>
      {loading ? (
        <div className="page-color">Loading...</div>
      ) : error ? (
        window.alert(error)
      ) : (
        <div className="page-color">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>Payment Method</th>
                <th>DELIVERED</th>
                <th>Delivery Update</th>
                <th>Payment Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      <div className="success">Paid</div>
                    ) : (
                      <div className="danger">'No'</div>
                    )}
                  </td>
                  <td>
                    {order.paymentMethod === 'Cash On Delivery' ? (
                      <div>Cash On Delivery </div>
                    ) : (
                      <div>Online Payment </div>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <div className="success">Delivered With LOve</div>
                    ) : (
                      <div className="danger">'No'</div>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <Button className="button">Delivered</Button>
                    ) : (
                      <Button
                        type="button"
                        className="button"
                        onClick={async () => {
                          const d = 2;
                          await axios.put('/updatepay', {
                            order,
                            d,
                          });
                          navigate('/');
                        }}
                      >
                        Deliver?
                      </Button>
                    )}
                  </td>
                  <td>
                    {order.isPaid ? (
                      <Button className="button">Paid</Button>
                    ) : (
                      <div>
                        {order.paymentMethod === 'Cash On Delivery' ? (
                          <Button
                            type="button"
                            className="button"
                            onClick={async () => {
                              const d = 3;
                              await axios.put('/updatepay', {
                                order,
                                d,
                              });
                              navigate('/');
                            }}
                          >
                            Paid?
                          </Button>
                        ) : (
                          <Button className="button">Online Payment</Button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
