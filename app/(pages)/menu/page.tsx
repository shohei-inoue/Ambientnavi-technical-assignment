export const dynamic = "force-dynamic";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MenuContents from "./_components/MenuContents/MenuContents";
import MainContent from "@/app/components/MainContainer/MainContent";
import { getCategories } from "@/app/actions/web/categoriesActions";

export default async function Menu() {
  const categories = await getCategories()
  return (
    <MainContainer>
      <MainContent>
        <MenuContents categories={categories}/>
      </MainContent>
    </MainContainer>
  );
}
