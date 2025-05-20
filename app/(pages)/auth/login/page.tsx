import { redirect } from "next/navigation";
import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import LoginContents from "./_components/LoginContents/LoginContents";

import { getSession } from "@/app/actions/web/tableSession/controller/TableSessionController";
import { hasLoggedInUserInSession } from "@/app/actions/web/userSession/controller/UserSessionController";

type Props = {
  searchParams: { table_number?: string };
};

export default async function Login({ searchParams }: Props) {
  const tableNumber = Number(searchParams.table_number);
  if (!tableNumber || isNaN(tableNumber)) {
    redirect("/"); // 不正ならトップに戻す
  }

  const session = await getSession(tableNumber);
  if (!session) {
    redirect(`/?table_number=${tableNumber}`);
  }

  const alreadyLoggedIn = await hasLoggedInUserInSession(session.sessionId);
  if (alreadyLoggedIn) {
    redirect("/menu");
  }

  return (
    <MainContainer>
      <Heading level={1}>ログイン</Heading>
      <MainContent>
        <LoginContents />
      </MainContent>
    </MainContainer>
  );
}
