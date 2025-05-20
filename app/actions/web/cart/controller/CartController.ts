import { TableSessionRepositoryImpl } from "@/app/actions/admin/tableSession/repository/TableSessionRepository";
import { CartRepositoryImpl } from "../repository/CartRepository";

import {
  addToCartUsecase,
  createCartUsecase,
  deleteCartUsecase,
  getCartUsecase,
} from "../usecase/CartUsecase";

// usecaseインスタンス化
const getCart = getCartUsecase(CartRepositoryImpl);
const createCart = createCartUsecase(CartRepositoryImpl);
const deleteCart = deleteCartUsecase(CartRepositoryImpl);
const addToCart = addToCartUsecase(CartRepositoryImpl);

// sessionId(string) → tableSessionId(int) 変換共通処理
async function resolveTableSessionId(sessionId: string): Promise<number> {
  const session = await TableSessionRepositoryImpl.getTableSessionBySessionId(sessionId);
  if (!session) throw new Error("セッションが存在しません");
  return session.id;
}

// get
export async function handleGetCart(sessionId: string) {
  const tableSessionId = await resolveTableSessionId(sessionId);
  return await getCart(tableSessionId);
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

//update
export async function handleAddToCart(
  sessionId: string,
  menuId: number,
  quantity: number,
  note?: string
) {
  const tableSessionId = await resolveTableSessionId(sessionId);
  return await addToCart(tableSessionId, menuId, quantity, note);
}