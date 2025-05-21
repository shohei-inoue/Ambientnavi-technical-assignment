export type OrderItem = {
  menuId: number;
  quantity: number;
  note?: string;
  menuName: string;
  price: number;
};

export type Order = {
  id: number;
  tableId: number;
  status: "PENDING" | "CONFIRMED" | "SERVED" | "PAID";
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
};

export type OrderItemInput = {
  menuId: number;
  quantity: number;
  note?: string;
};

export type OrderCreateInput = {
  tableId: number;
  items: OrderItemInput[];
};