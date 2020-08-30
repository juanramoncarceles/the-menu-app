import { createContext, useReducer } from 'react';
import type { OrderItem } from '../types';

const initialState = {items: [] as OrderItem[]};

const OrderContext = createContext<{state?: any; dispatch: React.Dispatch<{}>}>({state: initialState, dispatch: () => {}});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "add":
      return { ...state, items: state.items.concat({id: "a", qty: "b"}) }
    case "remove":
      return { ...state, items: state.items.slice(1) }
    default:
      return state;
  }
}

const OrderProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };