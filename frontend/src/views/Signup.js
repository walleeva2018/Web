import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Store } from '../Store';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/signin');
      console.log(data);
    } catch (err) {
      alert('Invalid email or password ');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/signin');
    }
  }, [navigate, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title> Sign-Up </title>
      </Helmet>
      <div className="page-color">
        <h1 className="my-3"> Sign-Up </h1>
      </div>
      <div className="page-color">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label> Name </Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label> Email </Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label> Password </Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit"> Sign Up </Button>
          </div>
          <div>
            Already Have an Account ? <Link to={`/signin`}>Login </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
}
