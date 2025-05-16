import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";
import CategoryContent from "./_components/CategoryContent/CategoryContent";

export const metadata: Metadata = {
  title: "カテゴリー詳細",
};

export default async function AdminCategory({
  params,
}: {
  params: { id: string };
}) {
  return (
    <MainContainer>
      <Heading level={1}>カテゴリー詳細</Heading>
      <MainContent>
        <CategoryContent id={params.id} />
      </MainContent>
    </MainContainer>
  );
}
