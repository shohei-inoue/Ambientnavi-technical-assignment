import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import MenuItemContent from "./_components/MenuItemContent/MenuItemContent";
import HeadNav from "@/app/components/HeadNav/HeadNav";

export const metadata = {
  title: "Menu Item",
};

type MenuItemProps = {
  params: Promise<{ id: string }>;
};

export default async function MenuItem({ params }: MenuItemProps) {
  const { id } = await params;
  return (
    <MainContainer>
      <HeadNav />
      <MainContent>
        <MenuItemContent id={id} />
      </MainContent>
    </MainContainer>
  );
}
