import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";
import MenuDetailContent from "./_components/MenuDetailContent/MenuDetailContent";

export const metadata: Metadata = {
  title: "メニュー詳細",
};

export default function MenuDetail({ params }: { params: { id: number } }) {
  return (
    <MainContainer>
      <Heading level={1}>メニュー詳細</Heading>
      <MainContent>
        <MenuDetailContent id={params.id} />
      </MainContent>
    </MainContainer>
  );
}
