import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function signin() {
  return (
    <Container className="small-container">
      <Helmet>
        <title> Sign-In </title>
      </Helmet>
      <h1 className="my-3"> Sign-In </h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label> Email </Form.Label>
          <Form.Control type="email" required></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label> Password </Form.Label>
          <Form.Control type="password" required></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit"> Sign In </Button>
        </div>
        <div>
          Dont Have an Account ? <Link to={`/signup`}>Create Account </Link>
        </div>
      </Form>
    </Container>
  );
}
