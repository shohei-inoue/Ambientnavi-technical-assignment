import { CartRepository } from "../repository/CartRepository";

// create
export function createCartUsecase(cr: CartRepository) {
  return async (tableSessionId: number) => {
    return await cr.createCart(tableSessionId);
  };
}

// get
export function getCartUsecase(cr: CartRepository) {
  return async (sessionId: number) => {
    return await cr.getCart(sessionId);
  };
}

// update
export function addToCartUsecase(cr: CartRepository) {
  return async (
    tableSessionId: number,
    menuId: number,
    quantity: number,
    note?: string
  ) => {
    let cart = await cr.getCart(tableSessionId);
    if (!cart) {
      cart = await cr.createCart(tableSessionId);
    }

    return await cr.addCartItem(cart.id, menuId, quantity, note);
  };
}

// delete
export function deleteCartUsecase(cr: CartRepository) {
  return async (sessionId: number) => {
    await cr.deleteCart(sessionId);
  };
}

// delete cartItem
export function deleteCartItemUsecase(cr: CartRepository) {
  return async (menuId: number) => {
    await cr.deleteCartItem(menuId);
  };
}
