import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import MenuHeadingContainer from "./_components/MenuHeadingContainer/MenuHeadingContainer";
import MenuContents from "./_components/MenuContents/MenuContents";

export default function AdminMenu() {
  return (
    <MainContainer>
      <MenuHeadingContainer />
      <MainContent>
        <MenuContents />
      </MainContent>
    </MainContainer>
  );
}
