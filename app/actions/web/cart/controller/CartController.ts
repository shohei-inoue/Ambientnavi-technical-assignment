"use server";

import { TableSessionRepositoryImpl } from "@/app/actions/web/tableSession/repository/TableSessionRepository";
import { CartRepositoryImpl } from "../repository/CartRepository";

import {
  addToCartUsecase,
  createCartUsecase,
  deleteCartItemUsecase,
  deleteCartUsecase,
  getCartUsecase,
} from "../usecase/CartUsecase";
import { getSessionCookie } from "@/app/lib/cookies";

const getCart = getCartUsecase(CartRepositoryImpl);
const createCart = createCartUsecase(CartRepositoryImpl);
const deleteCart = deleteCartUsecase(CartRepositoryImpl);
const addToCart = addToCartUsecase(CartRepositoryImpl);
const deleteCartItem = deleteCartItemUsecase(CartRepositoryImpl);

// sessionId(string) → tableSessionId(int) 変換共通処理
async function resolveTableSessionId(sessionId: string): Promise<number> {
  const session =
    await TableSessionRepositoryImpl.getTableSessionBySessionId(sessionId);
  if (!session) throw new Error("セッションが存在しません");
  return session.id;
}

// get
export async function handleGetCart() {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    throw new Error("セッションが存在しません。");
  }
  const tableSessionId = await resolveTableSessionId(sessionId);

  const cart = await getCart(tableSessionId);

  if (!cart) throw new Error("カートが見つかりません");

  return cart;
}

// create
export async function handleCreateCart(sessionId: string) {
  const tableSessionId = await resolveTableSessionId(sessionId);
  return await createCart(tableSessionId);
}

// delete
export async function handleDeleteCart(sessionId: string) {
  const tableSessionId = await resolveTableSessionId(sessionId);
  return await deleteCart(tableSessionId);
}

// delete cartItem
export async function handleDeleteCartItem(menuId: number) {
  return await deleteCartItem(menuId);
}

//update
export async function handleAddToCart(
  menuId: number,
  quantity: number,
  note?: string
) {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    throw new Error("セッションが存在しません。");
  }
  const tableSessionId = await resolveTableSessionId(sessionId);
  return await addToCart(tableSessionId, menuId, quantity, note);
}

// update increment cartItem
export async function handleIncrementCartItem(menuId: number, note?: string) {
  const sessionId = await getSessionCookie();
  if (!sessionId) throw new Error("セッションが見つかりません");

  const tableSessionId = await resolveTableSessionId(sessionId);
  return await addToCart(tableSessionId, menuId, 1, note);
}

// update decrement cartItem
export async function handleDecrementCartItem(menuId: number) {
  const sessionId = await getSessionCookie();
  if (!sessionId) throw new Error("セッションが見つかりません");

  const tableSessionId = await resolveTableSessionId(sessionId);

  const cart = await getCart(tableSessionId);
  const item = cart?.items.find((i) => i.menuId === menuId);

  if (!item || item.quantity <= 1) return;
  if (!cart) return;

  return await addToCart(cart.id, menuId, -1, item.note ?? undefined);
}

// remove cartItem
export async function handleRemoveCartItem(menuId: number) {
  const sessionId = await getSessionCookie();
  if (!sessionId) throw new Error("セッションが見つかりません");

  const tableSessionId = await resolveTableSessionId(sessionId);
  const cart = await getCart(tableSessionId);
  if (!cart) return;

  const item = cart.items.find((i) => i.menuId === menuId);
  if (!item) return;

  return await deleteCartItem(item.id);
}
