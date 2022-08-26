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
      return { ...state, users: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function UserList() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/users/getall`);
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
        <title> User List </title>
      </Helmet>
      <h1> User List </h1>
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
                <th>Name</th>
                <th>email</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <div className="success">Yes</div>
                    ) : (
                      <div className="danger">No</div>
                    )}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <Button className="button">Already Admin</Button>
                    ) : (
                      <Button
                        type="button"
                        className="button"
                        onClick={async () => {
                          const d = 4;
                          await axios.put('/api/users/update', {
                            user,
                            d,
                          });
                          navigate('/');
                        }}
                      >
                        Make Admin
                      </Button>
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
