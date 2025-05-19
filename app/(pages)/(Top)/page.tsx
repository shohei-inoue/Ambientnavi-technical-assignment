import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import TopLoginButton from "./_components/TopButton/TopLoginButton";
import TopRegisterButton from "./_components/TopButton/TopRegisterButton";
import TopeHeadContent from "./_components/TopHeadContent/TopHeadContent";
import DummyLoginButton from "@/app/test/_components/DummyLoginButton/DummyLoginButton";

export default function Top() {
  return (
    <MainContainer>
      <MainContent>
        <TopeHeadContent />
        <div className="flex flex-col justify-center mt-8 gap-4 w-full items-center">
          <TopLoginButton />
          <TopRegisterButton />
          <DummyLoginButton />{/* TODO テスト用ボタン */}
        </div>
      </MainContent>
    </MainContainer>
  );
}
