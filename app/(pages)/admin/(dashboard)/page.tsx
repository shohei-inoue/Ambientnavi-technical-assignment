export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import DashboardContents from "./_components/DashboardContents/DashboardContents2";

export default function AdminDashBoard() {
  return (
    <MainContainer>
      <MainContent>
        <DashboardContents />
      </MainContent>
    </MainContainer>
  )
}