import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";
import MenuDetailContent from "./_components/MenuDetailContent/MenuDetailContent";
import { handleGetMenuDetail } from "@/app/actions/admin/menu/controller/MenuController";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "メニュー詳細",
};

type AdminMenuDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminMenuDetail({
  params,
}: AdminMenuDetailProps) {
  const { id } = await params;
  const menuDetail = await handleGetMenuDetail(Number(id));

  if (!menuDetail) {
    notFound();
  }
  
  return (
    <MainContainer>
      <Heading level={1}>メニュー詳細</Heading>
      <MainContent>
        <MenuDetailContent menuDetail={menuDetail} />
      </MainContent>
    </MainContainer>
  );
}
