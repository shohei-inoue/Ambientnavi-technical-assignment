import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "メニュー詳細",
};

export default function MenuDetail({ params }: { params: { id: number } }) {
  return (
    <MainContainer>
      <MainContent>
        <h1 key={params.id}>Menu Detail</h1>
      </MainContent>
    </MainContainer>
  );
}
