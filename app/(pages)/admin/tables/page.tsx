export const dynamic = "force-dynamic"; 

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import TablesContents from "./_components/TablesContents/TablesContents";
import TablesHeadingContainer from "./_components/TablesHeadingContainer/TablesHeadingContainer";

export default function AdminTable() {
  return (
    <MainContainer>
      <TablesHeadingContainer />
      <MainContent>
        <TablesContents />
      </MainContent>
    </MainContainer>
  )
}