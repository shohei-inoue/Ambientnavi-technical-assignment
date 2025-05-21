import { prisma } from "@/app/lib/prisma";
import { Cart, CartItem } from "../domain/Cart";

export interface CartRepository {
  getCart(sessionId: number): Promise<Cart | null>;
  createCart(tableSessionId: number): Promise<Cart>;
  addCartItem(
    cartId: number,
    menuId: number,
    quantity: number,
    note?: string
  ): Promise<CartItem>;
  deleteCart(sessionId: number): Promise<void>;
  deleteCartItem(cartItemId: number): Promise<void>;
}

export const CartRepositoryImpl: CartRepository = {
  // get cart implement by session id
  async getCart(sessionId) {
    const cart = await prisma.cart.findUnique({
      where: { tableSessionId: sessionId },
      include: {
        items: {
          include: {
            menu: true, // price取得
          },
        },
      },
    });

    if (!cart) return null;

    const items: CartItem[] = cart.items.map((item) => ({
      id: item.id,
      cartId: item.cartId,
      menuId: item.menuId,
      quantity: item.quantity,
      note: item.note,
      menu: {
        name: item.menu.name,
        price: item.menu.price,
      },
    }));

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.menu.price * item.quantity,
      0
    );

    return {
      id: cart.id,
      tableSessionId: cart.tableSessionId,
      items,
      totalPrice,
    };
  },

  async createCart(tableSessionId) {
    const cart = await prisma.cart.create({
      data: { tableSessionId },
      include: { items: true },
    });

    return {
      id: cart.id,
      tableSessionId: cart.tableSessionId,
      items: [],
      totalPrice: 0,
    };
  },

  // add cart Item implement
  async addCartItem(
    cartId: number,
    menuId: number,
    quantity: number,
    note: string
  ) {
    const existing = await prisma.cartItem.findFirst({
      where: { cartId, menuId },
    });

    const updatedItem = existing
      ? await prisma.cartItem.update({
          where: { id: existing.id },
          data: {
            quantity: existing.quantity + quantity,
            note: note ?? existing.note,
          },
        })
      : await prisma.cartItem.create({
          data: { cartId, menuId, quantity, note },
        });

    return {
      id: updatedItem.id,
      cartId: updatedItem.cartId,
      menuId: updatedItem.menuId,
      quantity: updatedItem.quantity,
      note: updatedItem.note,
    };
  },

  // delete cart implement
  async deleteCart(sessionId: number) {
    const cart = await prisma.cart.findFirst({
      where: { tableSessionId: sessionId },
      include: { items: true },
    });

    if (!cart) return;

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    await prisma.cart.delete({ where: { id: cart.id } });
  },

  // delete cart item implement
  async deleteCartItem(cartItemId: number) {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  },
};
