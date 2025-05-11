'use client'

import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import RegisterContents from "./_components/RegisterContents/RegisterContents";

export default function Register() {
  return (
    <MainContainer>
      <Heading level={1}>会員登録</Heading>
      <MainContent>
        <RegisterContents />
      </MainContent>
    </MainContainer>
  )
}