export const dynamic = "force-dynamic";

import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import AdminLoginContents from "./_components/AdminLoginContents/AdminLoginContents";

export default async function AdminLogin() {
  return (
    <MainContainer>
      <Heading level={1}>管理者ログイン</Heading>
      <MainContent>
        <AdminLoginContents />
      </MainContent>
    </MainContainer>
  );
}
