import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  const ADDTOCART = async (item) => {
    const existItem = cartItem.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.quantity < quantity) {
      window.alert('THis product is out of stock');
      return;
    }
    ctxdispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Rating rating={product.rating} reviews={product.reviews}>
          {' '}
        </Rating>
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <Button className="button" onClick={() => ADDTOCART(product)}>
          ADD TO CART
        </Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
