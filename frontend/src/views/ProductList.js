import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/esm/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    default:
      return state;
  }
};

export default function ProductList() {
  var id = [];
  var name = [];
  var price = [];
  var category = [];
  var rating = [];
  var quantity = [];
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/products/getemall`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: window.alert(error),
        });
      }
    };
    fetchData();
  });
  var count = 0;
  for (let key in products) {
    name[count] = products[key].name;
    price[count] = products[key].price;
    category[count] = products[key].category;
    rating[count] = products[key].rating;
    quantity[count] = products[key].quantity;
    id[count] = products[key]._id;
    count = count + 1;
  }
  return (
    <div className="page-color">
      <Helmet>
        <title> Product List</title>
      </Helmet>
      <h1>Product List</h1>
      <div className="page-color">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id[0]}</td>
              <td>{name[0]}</td>
              <td>{price[0]}</td>
              <td>{category[0]}</td>
              <td>{rating[0]}</td>
              <td>{quantity[0]}</td>
              <td>
                <Button
                  type="button"
                  onClick={async () => {
                    const d = 0;
                    await axios.put('/api/products/update', {
                      id,
                      d,
                    });
                    navigate('/admin/productlist');
                  }}
                >
                  Increase
                </Button>
              </td>
            </tr>
            <tr>
              <td>{id[1]}</td>
              <td>{name[1]}</td>
              <td>{price[1]}</td>
              <td>{category[1]}</td>
              <td>{rating[1]}</td>
              <td>{quantity[1]}</td>
              <td>
                <Button
                  type="button"
                  onClick={async () => {
                    const d = 1;
                    await axios.put('/api/products/update', {
                      id,
                      d,
                    });
                    navigate('/admin/productlist');
                  }}
                >
                  Increase
                </Button>
              </td>
            </tr>
            <tr>
              <td>{id[2]}</td>
              <td>{name[2]}</td>
              <td>{price[2]}</td>
              <td>{category[2]}</td>
              <td>{rating[2]}</td>
              <td>{quantity[2]}</td>
              <td>
                <Button
                  type="button"
                  onClick={async () => {
                    const d = 2;
                    await axios.put('/api/products/update', {
                      id,
                      d,
                    });
                    navigate('/admin/productlist');
                  }}
                >
                  Increase
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
