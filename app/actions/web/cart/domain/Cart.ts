export type CartItem = {
  id: number;
  cartId: number;
  menuId: number;
  quantity: number;
  note?: string | null;
};

export type Cart = {
  id: number;
  tableSessionId: number;
  items: CartItem[];
  totalPrice: number;
};