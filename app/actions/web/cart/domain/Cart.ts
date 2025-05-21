export type CartItem = {
  id: number;
  cartId: number;
  menuId: number;
  quantity: number;
  note?: string | null;
  menu?: {
    name: string;
    price: number;
  };
};

export type Cart = {
  id: number;
  tableSessionId: number;
  items: CartItem[];
  totalPrice: number;
};