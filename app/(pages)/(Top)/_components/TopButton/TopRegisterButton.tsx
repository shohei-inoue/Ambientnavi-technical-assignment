"use client";
import { useRouter } from "next/navigation";

const TopRegisterButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/register");
  };

  return (
    <button
      className="bg-gray-500 text-white py-2 px-4 rounded"
      onClick={handleClick}
    >
      新規登録して注文を始める
    </button>
  );
};

export default TopRegisterButton;
