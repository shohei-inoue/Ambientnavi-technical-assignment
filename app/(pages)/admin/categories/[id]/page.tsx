import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";
import CategoryContent from "./_components/CategoryContent/CategoryContent";
import { notFound } from "next/navigation";
import { handleGetCategory } from "@/app/actions/admin/categories/controller/CategoriesController";

export const metadata: Metadata = {
  title: "カテゴリー詳細",
};

type AdminCategoryProps = {
  params: { id: string };
};

export default async function AdminCategory({ params }: AdminCategoryProps) {
  const category = await handleGetCategory(Number(params.id));

  if (!category) {
    notFound();
  }

  return (
    <MainContainer>
      <Heading level={1}>カテゴリー詳細</Heading>
      <MainContent>
        <CategoryContent category={category} />
      </MainContent>
    </MainContainer>
  );
}
