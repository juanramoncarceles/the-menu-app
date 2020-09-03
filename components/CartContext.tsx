import { createContext, useReducer } from 'react';
import type { OrderItem } from '../types';

interface IState {
  items: OrderItem[];
}

const initialState: IState = {items: []};

const StateContext = createContext<IState>(initialState);
const DispatchContext = createContext<React.Dispatch<{}>>(() => {});

const reducer = (state: IState, action: any) => {
  const id = action.payload;
  const itemIdx = state.items.findIndex((item: OrderItem) => item.id === id);
  switch (action.type) {
    case "add":
      if (itemIdx === -1) { // If the item doesn't exist yet.
        return { ...state, items: state.items.concat({id: id, qty: 1}) };
      } else { // If the item already exists.
        return { ...state, items: state.items.map((item: OrderItem) => item.id === id ? { ...item, qty: ++item.qty } : item) };
      }
    case "remove":
      if (itemIdx === -1) {
        return state;
      } else {
        if (state.items[itemIdx].qty > 1) {
          return { ...state, items: state.items.map((item: OrderItem) => item.id === id ? { ...item, qty: --item.qty } : item) };
        } else {
          return { ...state, items: state.items.filter((item: OrderItem) => item.id !== id) };
        }
      }
    default:
      return state;
  }
}

const OrderProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export { StateContext, DispatchContext, OrderProvider };