export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import CategoriesHeadingContainer from "./_components/CategoriesHeadingContainer/CategoriesHeadingContainer";
import CategoriesContents from "./_components/CategoriesContents/CategoriesContents";

export default function AdminCategories() {
  return (
    <MainContainer>
      <CategoriesHeadingContainer />
      <MainContent>
        <CategoriesContents />
      </MainContent>
    </MainContainer>
  );
}
