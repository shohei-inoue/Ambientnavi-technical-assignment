export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MenuContents from "./_components/MenuContents/MenuContents";
import MainContent from "@/app/components/MainContainer/MainContent";
import { getCategories } from "@/app/actions/web/categoriesActions";
import { requireUserSession } from "@/app/lib/auth";

export default async function Menu() {
  await requireUserSession()
  const categories = await getCategories()
  return (
    <MainContainer>
      <MainContent>
        <MenuContents categories={categories}/>
      </MainContent>
    </MainContainer>
  );
}
