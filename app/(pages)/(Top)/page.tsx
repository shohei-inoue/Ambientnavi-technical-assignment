import { redirect } from "next/navigation";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import TopContent from "./_components/TopContent/TopContent";
import { getSession } from "@/app/actions/admin/tableSession/controller/TableSessionController";
import { hasLoggedInUserInSession } from "@/app/actions/admin/userSession/controller/UserSessionController";

export default async function Top({ searchParams }: { searchParams: { table_number?: string } }) {
  const tableNumber = Number(searchParams.table_number);

  if (!tableNumber || isNaN(tableNumber)) {
    return (
      <MainContainer>
        <MainContent>
          <p className="text-red-500">テーブル番号が不正です</p>
          <p className="text-red-500">スタッフをお呼びください</p>
        </MainContent>
      </MainContainer>
    );
  }

  const session = await getSession(tableNumber);

  if (session) {
    const hasLoggedIn = await hasLoggedInUserInSession(session.sessionId);

    if (hasLoggedIn) {
      redirect("/menu");
    } else {
      redirect(`/auth/login?table_number=${tableNumber}`);
    }
  }

  return (
    <MainContainer>
      <MainContent>
        <TopContent tableNumber={tableNumber} />
      </MainContent>
    </MainContainer>
  );
}