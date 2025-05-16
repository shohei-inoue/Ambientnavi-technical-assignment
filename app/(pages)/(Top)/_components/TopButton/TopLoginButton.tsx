"use client";

import { useRouter } from "next/navigation";

const TopLoginButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };
  return (
    <button
      className="bg-gray-500 text-white py-2 px-4 rounded"
      onClick={handleClick}
    >
      ログインして注文を始める
    </button>
  );
};

export default TopLoginButton;
