import {
  createTableSession,
  getLinkUserToTableSession,
  getTableSession,
} from "../usecase/TableSessionUsecase";
import { TableSessionRepositoryImpl } from "../repository/TableSessionRepository";
import { TableRepositoryImpl } from "../../table/repository/TableRepository";
import { getSessionCookie, setSessionCookie } from "@/app/lib/cookies";
import { hasLoggedInUser } from "../../userSession/usecase/UserSessionUsecase";
import { UserSessionRepositoryImpl } from "../../userSession/repository/UserSessionRepository";

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

const hasLoggedInUserUseCase = hasLoggedInUser(
  TableSessionRepositoryImpl,
  UserSessionRepositoryImpl
);

// get
export async function getSession(tableNumber: number) {
  return await getSessionUsecase(tableNumber);
}

// create
export async function createSession(tableNumber: number) {
  const session = await createSessionUsecase(tableNumber);
  await setSessionCookie(session.sessionId);
  return session;
}

// get and link user to session
export async function getLinkUserToSession(userId: number) {
  const sessionId = await getSessionCookie();

  if (!sessionId) throw new Error("セッションIDが見つかりません");

  return await linkUserToSessionUsecase(sessionId, userId);
}

// check login user in session
export async function checkIfSomeoneLoggedIn() {
  return await hasLoggedInUserUseCase();
}