import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import LoginContents from "./_components/LoginContents/LoginContents";
import { checkIfSomeoneLoggedIn } from "@/app/actions/admin/tableSession/controller/TableSessionController";
import { redirect } from "next/navigation";

export default async function Login() {
  const alreadyLoggedIn = await checkIfSomeoneLoggedIn();

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
