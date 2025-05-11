'use client'

import Heading from "@/app/components/Heading/Heading";
import MainContainer from "@/app/components/MainContainer/MainContainer";
import MainContent from "@/app/components/MainContainer/MainContent";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push("/auth/login")
  }

  return (
    <MainContainer>
      <MainContent>
        <Heading level={1}>会員登録</Heading>
          {/* TODO デザイン調整必須 */}
          <form className="flex flex-col gap-4 items-center w-full">
            <div>
              <label htmlFor="username">氏名</label>
              <input 
                type="text"
                id="username"
                name="username"
                required 
                className="color-gray-700 border border-gray-300 rounded-md p-2"
                placeholder="山田太郎"
              />
            </div>
            <div>
              <label htmlFor="birthday">生年月日</label>
              <input 
                type="text"
                id="birthday"
                name="birthday"
                required
                className="color-gray-700 border border-gray-300 rounded-md p-2"
                placeholder="YYYY/MM/DD"
              />
            </div>
            <div>
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="color-gray-700 border border-gray-300 rounded-md p-2"
                placeholder="example.com"
              />
            </div>
            <div>
              <label htmlFor="password">パスワード</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="color-gray-700 border border-gray-300 rounded-md p-2"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-500 text-white py-2 px-4 rounded">
              登録
            </button>
          </form>
          <div className="flex flex-col gap-4 items-center  cursor-pointer">
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={handleLoginClick}
            >
              すでにアカウントをお持ちの方はこちら
            </button>
        </div>
      </MainContent>
    </MainContainer>
  )
}