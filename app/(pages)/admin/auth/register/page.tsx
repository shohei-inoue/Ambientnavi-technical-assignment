export const dynamic = "force-dynamic";

import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import AdminRegisterContents from "./_components/AdminRegisterContents/AdminRegisterContents";

export default async function Register() {

  return (
    <MainContainer>
      <Heading level={1}>管理者登録</Heading>
      <MainContent>
        <AdminRegisterContents />
      </MainContent>
    </MainContainer>
  );
}
