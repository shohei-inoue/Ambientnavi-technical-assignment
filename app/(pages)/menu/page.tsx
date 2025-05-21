export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MenuContents from "./_components/MenuContents/MenuContents";
import MainContent from "@/app/components/MainContainer/MainContent";
import { requireUserSession } from "@/app/lib/auth";
import { handleGetCategories } from "@/app/actions/admin/categories/controller/CategoriesController";

export default async function Menu() {
  await requireUserSession()
  const categories = await handleGetCategories()
  return (
    <MainContainer>
      <MainContent>
        <MenuContents categories={categories}/>
      </MainContent>
    </MainContainer>
  );
}
