import { cookies } from "next/headers";
import { UserSessionRepository } from "../repository/UserSessionRepository";
import { TableSessionRepository } from "../../tableSession/repository/TableSessionRepository";

// has login user in session
export function hasLoggedInUser(
  tsr: TableSessionRepository,
  usr: UserSessionRepository
) {
  return async (): Promise<boolean> => {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value;
    if (!sessionId) return false;

    const session = await tsr.getTableSessionBySessionId(sessionId);
    if (!session) return false;

    const userSessions = await usr.getUserSessionsByTableSessionId(session.id);
    return userSessions.length > 0;
  };
}