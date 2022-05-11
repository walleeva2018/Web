import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItem: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existItem = state.cart.cartItem.find(
        (item) => item._id === newItem._id
      );
      const cartItem = existItem
        ? state.cart.cartItem.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItem, newItem];
      return { ...state, cart: { ...state.cart, cartItem } };
    case 'Remove_from_cart': {
      const cartItem = state.cart.cartItem.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, cart: { ...state.cart, cartItem } };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
