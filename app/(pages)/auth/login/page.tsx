import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import LoginContents from "./_components/LoginContents/LoginContents";

export default function Login() {
  return (
    <MainContainer>
      <Heading level={1}>ログイン</Heading>
      <MainContent>
        <LoginContents />
      </MainContent>
    </MainContainer>
  )
}