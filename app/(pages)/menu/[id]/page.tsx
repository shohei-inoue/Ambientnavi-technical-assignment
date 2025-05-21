import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import MenuItemContent from "./_components/MenuItemContents/MenuItemContents";
import HeadNav from "@/app/components/HeadNav/HeadNav";
import { getMenuDetail } from "@/app/actions/web/menuActions";
import NoData from "@/app/components/NoData/NoData";

export const metadata = {
  title: "Menu Item",
};

type MenuItemProps = {
  params: Promise<{ id: string }>;
};

export default async function MenuItem({ params }: MenuItemProps) {
  const { id } = await params;
  const menu = await getMenuDetail(parseInt(id));
  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        {menu ? <MenuItemContent menu={menu} /> : <NoData />}
      </MainContent>
    </MainContainer>
  );
}
