export type OrderItem = {
  menuId: number;
  quantity: number;
  note?: string;
};

export type Order = {
  tableId: number;
  items: OrderItem[];
};