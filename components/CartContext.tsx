import { createContext, useReducer, ReactNode } from 'react';
import type { OrderItem, ItemData } from '../types';
import { ActionTypes } from '../types/enums';

interface IState {
  items: OrderItem[];
  itemsData: ItemData[]; // Represents all the fetched data. In other words all the data of the items.
}

type Action = {
  type: ActionTypes.Add | ActionTypes.Remove;
  payload: string;
} | {
  type: ActionTypes.Store;
  payload: ItemData[];
}

const initialState: IState = {items: [], itemsData: []};

const StateContext = createContext<IState>(initialState);
const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

const reducer = (state: IState, action: Action) => {
  if (action.type === ActionTypes.Add || action.type === ActionTypes.Remove) {
    const id = action.payload;
    const itemIdx = state.items.findIndex((item: OrderItem) => item.id === id);
    switch (action.type) {
      case ActionTypes.Add:
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
      case ActionTypes.Remove:
        if (itemIdx === -1) {
          return state;
        } else {
          if (state.items[itemIdx].qty > 1) {
            return { ...state, items: state.items.map((item: OrderItem) => item.id === id ? { ...item, qty: --item.qty } : item) };
          } else {
            return { ...state, items: state.items.filter((item: OrderItem) => item.id !== id) };
          }
        }      
    }
  } else if (action.type === ActionTypes.Store) {
    return { ...state, itemsData: [...action.payload] }; // TODO add to existing elements in the array, this removes the previous array
  } else {
    return state;
  }
}

interface IProps {
  children: ReactNode;
}

const OrderProvider = (props: IProps) => {
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