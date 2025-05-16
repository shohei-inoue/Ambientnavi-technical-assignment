import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import TopLoginButton from "./_components/TopButton/TopLoginButton";
import TopRegisterButton from "./_components/TopButton/TopRegisterButton";
import TopeHeadContent from "./_components/TopHeadContent/TopHeadContent";

export default function Top() {
  return (
    <MainContainer>
      <MainContent>
        <TopeHeadContent />
        {/* デザイン調整必須 */}
        <div className="flex flex-col justify-center mt-8 gap-4 w-full items-center">
          <TopLoginButton />
          <TopRegisterButton />
        </div>
      </MainContent>
    </MainContainer>
  );
}
