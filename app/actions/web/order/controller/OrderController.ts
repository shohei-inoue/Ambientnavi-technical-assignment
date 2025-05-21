"use server";

import { getSessionCookie } from "@/app/lib/cookies";
import { TableSessionRepositoryImpl } from "@/app/actions/web/tableSession/repository/TableSessionRepository";
import { createOrderUsecase, getOrdersUsecase } from "../Usecase/OrderUsecase";
import { OrderRepositoryImpl } from "../Repository/OrderRepository";
import { CartRepositoryImpl } from "../../cart/repository/CartRepository";
import {
  getCartUsecase,
  deleteCartUsecase,
} from "../../cart/usecase/CartUsecase";
import { OrderCreateInput } from "../domain/OrderDomain";

const createOrder = createOrderUsecase(OrderRepositoryImpl);
const getCart = getCartUsecase(CartRepositoryImpl);
const deleteCart = deleteCartUsecase(CartRepositoryImpl);
const getOrders = getOrdersUsecase(OrderRepositoryImpl);

async function resolveTableSession(sessionId: string) {
  const session =
    await TableSessionRepositoryImpl.getTableSessionBySessionId(sessionId);
  if (!session) throw new Error("セッションが存在しません");
  return session;
}

export async function handleCreateOrder() {
  const sessionId = await getSessionCookie();
  if (!sessionId) throw new Error("セッションIDが見つかりません");

  const session = await resolveTableSession(sessionId);
  const cart = await getCart(session.id);
  if (!cart || cart.items.length === 0) throw new Error("カートが空です");

  const order: OrderCreateInput = {
    tableId: session.tableId,
    items: cart.items.map((item) => ({
      menuId: item.menuId,
      quantity: item.quantity,
      note: item.note ?? undefined,
    })),
  };

  await createOrder(order);
  await deleteCart(session.id); // 注文完了後にカートを空にする
}

export async function handleGetOrders() {
  const sessionId = await getSessionCookie();
  if (!sessionId) throw new Error("セッションIDが見つかりません");

  const session = await resolveTableSession(sessionId);
  const orders = await getOrders(session.tableId);

  return orders;
}
