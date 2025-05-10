'use client'

import { useRouter } from "next/navigation"

const HeadNav = () => {
  const router = useRouter()

  // TODO クエリパラメータを定義次第変更
  const handleClick = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-100 shadow flex items-center p-4">
      <button 
        className="flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <span className="material-symbols-rounded">arrow_back_ios</span>
        <p>戻る</p>
      </button>
    </nav>
  )
}

export default HeadNav