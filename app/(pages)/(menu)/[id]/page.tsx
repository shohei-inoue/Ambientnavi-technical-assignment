import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import MenuItemContent from "./_components/MenuItemContent/MenuItemContent";

export const metadata = {
  title: "Menu Item",
}

export default async function MenuItem({ params }: { params: { id: string } }) {
  return (
    <MainContainer>
      <MainContent>
        <MenuItemContent id={params.id} />
      </MainContent>
    </MainContainer>
  )
}