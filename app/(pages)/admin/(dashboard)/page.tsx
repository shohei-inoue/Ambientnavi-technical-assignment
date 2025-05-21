export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import DashboardContents from "./_components/DashboardContents/DashboardContents";

export default async function AdminDashBoard() {
  return (
    <MainContainer>
      <MainContent>
        {/* TODO 2025/05/22 dashboardのactionsを作成し追加する */}
        <DashboardContents />
      </MainContent>
    </MainContainer>
  );
}