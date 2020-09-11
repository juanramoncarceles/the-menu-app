import { createContext, useReducer, ReactNode, useEffect, useContext } from 'react';
import type { OrderItem, ItemData, AppSettings } from '../types';
import { ActionTypes } from '../types/enums';
import { mergeArraysOfObjects, formatPriceFactory } from '../shared/utils';

interface IState {
  items: OrderItem[];
  itemsData: ItemData[]; // Represents all the fetched data. In other words all the data of the items.
  settings: AppSettings;
  formatPrice: (n: number) => string;
}

type Action = {
  type: ActionTypes.Add | ActionTypes.Remove;
  payload: string;
} | {
  type: ActionTypes.Store;
  payload: [ItemData[], AppSettings];
} | {
  type: ActionTypes.Factory;
  payload: (n: number) => string;
}

const initialState: IState = {items: [], itemsData: [], settings: {currencySymbol: '', priceAmountDecimals: 3}, formatPrice: f => f.toString()};

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
    const [newItemsData, settings] = action.payload;
    return { ...state, itemsData: mergeArraysOfObjects(state.itemsData, newItemsData), settings };
  } else if (action.type === ActionTypes.Factory) {
    return { ...state, formatPrice: action.payload }
  } else {
    return state;
  }
}

interface IProps {
  children: ReactNode;
}

const AppContextProvider = ({children}: IProps) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Running format price factory.");
    dispatch({type: ActionTypes.Factory, payload: formatPriceFactory(state.settings.priceAmountDecimals, state.settings.currencySymbol)});
  }, [state.settings]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export { StateContext, DispatchContext, AppContextProvider };