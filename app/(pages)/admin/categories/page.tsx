import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import CategoriesHeadingContainer from "./_components/CategoriesHeadingContainer/CategoriesHeadingContainer";
import CategoriesContents from "./_components/CategoriesContents/Categoriescontents";

export default function AdminCategories() {
  return (
    <MainContainer>
      <CategoriesHeadingContainer />
      <MainContent>
        <CategoriesContents />
      </MainContent>
    </MainContainer>
  )
}