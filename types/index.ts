export interface BaseObject {
  id: string;
}

export interface ItemData extends BaseObject {
  title: string;
  price: number;
  description: string;
  image: { url: string };
  category: CategoryData;
}

export interface CategoryData extends BaseObject {
  name: string;
  slug: string;
}

export interface OrderItem extends BaseObject {
  data: ItemData;
  qty: number;
}

export interface AppSettings {
  currencySymbol: string;
  priceAmountDecimals: number;
}
