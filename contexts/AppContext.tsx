import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import type { OrderItem, ItemData, AppSettings, CategoryData } from "../types";
import { Locale } from "../translations/types";
import { locales } from "../translations/config";
import { ActionTypes } from "../types/enums";
import { mergeArraysOfObjects, formatPriceFactory } from "../shared/utils";
import { defaultTheme, darkTheme, Theme } from "../styles";

interface IState {
  orderItems: OrderItem[];
  itemsData: ItemData[]; // Represents all the fetched data. In other words all the data of the items.
  categoriesData: CategoryData[];
  settings: AppSettings;
  formatPrice: (n: number) => string;
  theme: Theme;
  locale: Locale;
}

type Action =
  | {
      type: ActionTypes.AddItem | ActionTypes.RemoveItem;
      payload: string;
    }
  | {
      type: ActionTypes.StoreItems;
      payload: [ItemData[], AppSettings];
    }
  | {
      type: ActionTypes.StoreCategories;
      payload: CategoryData[];
    }
  | {
      type: ActionTypes.Factory;
      payload: (n: number) => string;
    }
  | {
      type: ActionTypes.ChangeTheme;
      payload: string;
    }
  | {
      type: ActionTypes.ChangeLanguage;
      payload: Locale;
  };

const initialState: IState = {
  orderItems: [],
  itemsData: [],
  categoriesData: [],
  settings: { currencySymbol: "", priceAmountDecimals: 3 },
  formatPrice: (f) => f.toString(),
  theme: defaultTheme,
  locale: locales[0],
};

const StateContext = createContext<IState>(initialState);
const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

const reducer = (state: IState, action: Action) => {
  if (
    action.type === ActionTypes.AddItem ||
    action.type === ActionTypes.RemoveItem
  ) {
    const id = action.payload;
    const itemIdx = state.orderItems.findIndex(
      (item: OrderItem) => item.id === id
    );
    switch (action.type) {
      case ActionTypes.AddItem:
        if (itemIdx === -1) {
          // If the item doesn't exist yet.
          const itemData = state.itemsData.find((item) => item.id === id);
          if (itemData !== undefined) {
            return {
              ...state,
              orderItems: state.orderItems.concat({
                id: id,
                data: itemData,
                qty: 1,
              }),
            };
          } else {
            return state;
          }
        } else {
          // If the item already exists.
          return {
            ...state,
            orderItems: state.orderItems.map((item: OrderItem) =>
              item.id === id ? { ...item, qty: ++item.qty } : item
            ),
          };
        }
      case ActionTypes.RemoveItem:
        if (itemIdx === -1) {
          return state;
        } else {
          if (state.orderItems[itemIdx].qty > 1) {
            return {
              ...state,
              orderItems: state.orderItems.map((item: OrderItem) =>
                item.id === id ? { ...item, qty: --item.qty } : item
              ),
            };
          } else {
            return {
              ...state,
              orderItems: state.orderItems.filter(
                (item: OrderItem) => item.id !== id
              ),
            };
          }
        }
    }
  } else if (action.type === ActionTypes.StoreItems) {
    const [newItemsData, settings] = action.payload;
    return {
      ...state,
      itemsData: mergeArraysOfObjects(state.itemsData, newItemsData),
      settings,
    };
  } else if (action.type === ActionTypes.StoreCategories) {
    return {
      ...state,
      categoriesData: action.payload,
    };
  } else if (action.type === ActionTypes.Factory) {
    return { ...state, formatPrice: action.payload };
  } else if (action.type === ActionTypes.ChangeTheme) {
    let theme;
    switch (action.payload) {
      case 'light':
        theme = defaultTheme;
        break;
      case 'dark':
        theme = darkTheme;
        break;
      default:
        theme = defaultTheme;
        break;
    }
    return { ...state, theme };
  } else if (action.type === ActionTypes.ChangeLanguage) {
    return {
      ...state,
      locale: action.payload,
    };
  } else {
    return state;
  }
};

interface IProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Running format price factory.");
    dispatch({
      type: ActionTypes.Factory,
      payload: formatPriceFactory(
        state.settings.priceAmountDecimals,
        state.settings.currencySymbol
      ),
    });
  }, [state.settings]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { StateContext, DispatchContext, AppContextProvider };
