import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import CategoriesAddForm from "./_components/CategoriesAddForm/CategoriesAddForm";

export default function AddCategories() {
  return (
    <MainContainer>
      <Heading level={1}>カテゴリーを追加</Heading>
      <MainContent>
        <CategoriesAddForm />
      </MainContent>
    </MainContainer>
  );
}
