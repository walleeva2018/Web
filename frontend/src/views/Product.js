import axios from 'axios';
import { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Product() {
  const param = useParams();
  const { slug } = param;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxdispatch } = useContext(Store);

  const { cart } = state;
  const AddtocartHandler = async () => {
    const existItem = cart.cartItem.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.quantity < quantity) {
      window.alert('THis product is out of stock');
      return;
    }
    ctxdispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  };

  return loading ? (
    <div className="page-color">Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <h1>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
        </h1>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>Product Name : {product.name}</ListGroupItem>
            <ListGroupItem>Category : {product.category}</ListGroupItem>
            <ListGroupItem>Price(in BDT): ${product.price}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>Rating : {product.rating}</ListGroupItem>
            <ListGroupItem>Rated By : {product.reviews} People</ListGroupItem>
          </ListGroup>
          <Button className="button" onClick={AddtocartHandler}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default Product;
