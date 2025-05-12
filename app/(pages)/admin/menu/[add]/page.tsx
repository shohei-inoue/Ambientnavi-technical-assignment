import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "メニューを追加",
}

export default function AddMenu() {
  return (
    <MainContainer>
      <MainContent>
        <h1>メニュー追加</h1>
      </MainContent>
    </MainContainer>
  )
}