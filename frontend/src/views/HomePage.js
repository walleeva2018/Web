import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import { Helmet } from 'react-helmet-async';
import Sky from 'react-sky';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {' '}
      <h1 className="page-color">
        <Helmet>
          <title>SARAZ</title>
        </Helmet>
        Featured Products
      </h1>
      <div className="products">
        {loading ? (
          <div className="page-color">loading</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}> </Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Sky
        images={{
          /* FORMAT AS FOLLOWS */
          0: 'https://earthsky.org/upl/2020/01/rigel-astropixels-Fred-Espenak-800.png' /* You can pass as many images as you want */,
          1: 'https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616__340.jpg',
          2: 'https://earthsky.org/upl/2020/01/rigel-astropixels-Fred-Espenak-800.png',
          3: 'https://earthsky.org/upl/2020/01/rigel-astropixels-Fred-Espenak-800.png',
          /* 3: your other image... */
          /* 4: your other image... */
          /* 5: your other image... */
          /* ... */
        }}
        how={
          130
        } /* Pass the number of images Sky will render chosing randomly */
        time={40} /* time of animation */
        size={'100px'} /* size of the rendered images */
        background={'palettedvioletred'} /* color of background */
      />
    </div>
  );
}

export default HomePage;
