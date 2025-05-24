export const runtime = "nodejs";

import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import MenuItemContent from "./_components/MenuItemContents/MenuItemContents";
import HeadNav from "@/app/components/HeadNav/HeadNav";
import NoData from "@/app/components/NoData/NoData";
import { handleGetMenuDetail } from "@/app/actions/web/menu/controller/MenuController";

export const metadata = {
  title: "Menu Item",
};

type MenuItemProps = {
  params: Promise<{ id: string }>;
};

export default async function MenuItem({ params }: MenuItemProps) {
  const { id } = await params;
  const menu = await handleGetMenuDetail(Number(id))
  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        {menu ? <MenuItemContent menu={menu} /> : <NoData />}
      </MainContent>
    </MainContainer>
  );
}
