import { createContext, useReducer } from 'react';
import type { OrderItem, ItemData } from '../types';

interface IState {
  items: OrderItem[];
  itemsData: ItemData[]; // Represents all the fetched data. In other words all the data of the items.
}

const initialState: IState = {items: [], itemsData: []};

const StateContext = createContext<IState>(initialState);
const DispatchContext = createContext<React.Dispatch<{}>>(() => {});

const reducer = (state: IState, action: any) => {
  const id = action.payload;
  const itemIdx = state.items.findIndex((item: OrderItem) => item.id === id);
  switch (action.type) {
    case "add":
      if (itemIdx === -1) { // If the item doesn't exist yet.
        const itemData = state.itemsData.find(item => item.id === id);
        if (itemData !== undefined) {
          return { ...state, items: state.items.concat({id: id, data: itemData, qty: 1}) };
        } else {
          return state;
        }
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
    case "STORE_ITEMS_DATA":
      return { ...state, itemsData: [...action.payload] }; // TODO add to existing elements in the array, this removes the previous array
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