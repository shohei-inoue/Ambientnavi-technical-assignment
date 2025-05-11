'use client'

import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()

  const handleRegisterClick = () => {
    router.push("/auth/register")
  }

  const handleForgotPasswordClick = () => {
    router.push("/auth/forgot-password")
  }

  return (
    <MainContainer>
      <MainContent>
        <Heading level={1}>ログイン</Heading>
        <div>
          <form action="">
            <div>
              <label htmlFor="email">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">ログイン</button>
          </form>
        </div>
        <div className="flex gap-4 items-center w-full cursor-pointer">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={handleRegisterClick} 
          >
            アカウントをお持ちでない方はこちら
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={handleForgotPasswordClick} 
          >
            パスワードを忘れた方はこちら
          </button>
        </div>
      </MainContent>
    </MainContainer>
  )
}