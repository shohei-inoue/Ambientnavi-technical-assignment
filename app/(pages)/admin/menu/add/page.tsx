import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { Metadata } from "next";
import MenuAddForm from "./_components/MenuAddForm/MenuAddForm";

export const metadata: Metadata = {
  title: "メニューを追加",
}

export default function AddMenu() {
  return (
    <MainContainer>
      <Heading level={1}>メニューを追加</Heading>
      <MainContent>
        <MenuAddForm />
      </MainContent>
    </MainContainer>
  )
}