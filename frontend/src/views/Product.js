import { useParams } from 'react-router-dom';

function Product() {
  const param = useParams();
  const { slug } = param;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
export default Product;
