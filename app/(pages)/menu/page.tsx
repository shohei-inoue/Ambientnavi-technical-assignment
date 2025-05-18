export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MenuContents from "./_components/MenuContents/MenuContents";
import MainContent from "@/app/components/MainContainer/MainContent";

export default function Menu() {
  return (
    <MainContainer>
      <MainContent>
        <MenuContents />
      </MainContent>
    </MainContainer>
  );
}
