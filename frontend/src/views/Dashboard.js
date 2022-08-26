import axios from 'axios';
import React from 'react';
import { useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, order: action.payload };
    default:
      return state;
  }
}

export default function Dashboard() {
  const [{ order }, dispatch] = useReducer(reducer, {
    order: {},
  });
  var OrderCount = 0;
  var PaidOrderCount = 0;
  var UnpaidOrderCount = 0;
  var Delivered = 0;
  var NotDelivered = 0;
  var TotalEarnings = 0;
  var AmountDue = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/getall`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        window.alert(error);
      }
    };
    fetchData();
  });
  for (let key in order) {
    if (order[key].isPaid === true) {
      PaidOrderCount = PaidOrderCount + 1;
      TotalEarnings = TotalEarnings + order[key].totalPrice;
    } else {
      UnpaidOrderCount = UnpaidOrderCount + 1;
      AmountDue = AmountDue + order[key].totalPrice;
    }
    if (order[key].isDelivered === true) {
      Delivered = Delivered + 1;
    } else {
      NotDelivered = NotDelivered + 1;
    }
    OrderCount = OrderCount + 1;
  }
  return (
    <div>
      <div class="card text-white bg-primary mb-3">
        <div class="card-header">Total Orders</div>
        <div class="card-body">
          <h5 class="card-title">{OrderCount}</h5>
        </div>
      </div>
      <div class="card text-white bg-success mb-3">
        <div class="card-header">Total Paid Products</div>
        <div class="card-body">
          <h5 class="card-title">{PaidOrderCount}</h5>
          <p class="card-text">
            Total Earnings from sold shirts {TotalEarnings}
          </p>
        </div>
      </div>
      <div class="card text-white bg-danger mb-3">
        <div class="card-header">Total Unpaid Orders</div>
        <div class="card-body">
          <h5 class="card-title">{UnpaidOrderCount}</h5>
          <p class="card-text">Total money to be collected {AmountDue}</p>
        </div>
      </div>
      <div class="card text-white bg-info mb-3">
        <div class="card-header">Total Delivered Products</div>
        <div class="card-body">
          <h5 class="card-title">{Delivered}</h5>
        </div>
      </div>
      <div class="card bg-light mb-3">
        <div class="card-header">Total Products to be delivered</div>
        <div class="card-body">
          <h5 class="card-title">{NotDelivered}</h5>
        </div>
      </div>
    </div>
  );
}
