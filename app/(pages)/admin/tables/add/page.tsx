import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import TablesAddForm from "./_components/TablesAddForm/TablesAddForm";

export default function AddTables() {
  return (
    <MainContainer>
      <Heading level={1}>カテゴリーを追加</Heading>
      <MainContent>
        <TablesAddForm />
      </MainContent>
    </MainContainer>
  );
}
