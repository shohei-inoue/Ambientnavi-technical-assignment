"use server";

import {
  createTableSession,
  getLinkUserToTableSession,
  getTableSession,
} from "../usecase/TableSessionUsecase";
import { TableSessionRepositoryImpl } from "../repository/TableSessionRepository";
import { TableRepositoryImpl } from "../../../admin/table/repository/TableRepository";
import { getSessionCookie, setSessionCookie } from "@/app/lib/cookies";;

// usecase instance
const createSessionUsecase = createTableSession(
  TableSessionRepositoryImpl,
  TableRepositoryImpl
);
const getSessionUsecase = getTableSession(
  TableSessionRepositoryImpl,
  TableRepositoryImpl
);
const linkUserToSessionUsecase = getLinkUserToTableSession(
  TableSessionRepositoryImpl
);

// get
export async function getSession(tableNumber: number) {
  return await getSessionUsecase(tableNumber);
}

// create
export async function createSession(tableNumber: number, guestCount: number) {
  const session = await createSessionUsecase(tableNumber, guestCount);
  await setSessionCookie(session.sessionId);
  return session;
}

// get and link user to session
export async function getLinkUserToSession(userId: number) {
  const sessionId = await getSessionCookie();

  if (!sessionId) throw new Error("セッションIDが見つかりません");

  return await linkUserToSessionUsecase(sessionId, userId);
}
