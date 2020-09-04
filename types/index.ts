export interface BaseObject {
  id: string;
}

export interface ItemData extends BaseObject {
  //id: string;
  title: string;
  price: number;
  description: string;
}

export interface CategoryData extends BaseObject {
  //id: string;
  name: string;
}

export interface OrderItem extends BaseObject {
  //id: string,
  data: ItemData,
  qty: number
}