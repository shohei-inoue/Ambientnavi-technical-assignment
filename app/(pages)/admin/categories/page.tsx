export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import CategoriesHeadingContainer from "./_components/CategoriesHeadingContainer/CategoriesHeadingContainer";


export default function AdminCategories() {
  return (
    <MainContainer>
      <CategoriesHeadingContainer />
      <MainContent>
        <CategoriesContennts />
      </MainContent>
    </MainContainer>
  );
}
