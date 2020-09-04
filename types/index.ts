export interface BaseObject {
  id: string;
}

export interface ItemData extends BaseObject {
  title: string;
  price: number;
  description: string;
}

export interface CategoryData extends BaseObject {
  name: string;
}

export interface OrderItem extends BaseObject {
  data: ItemData,
  qty: number
}