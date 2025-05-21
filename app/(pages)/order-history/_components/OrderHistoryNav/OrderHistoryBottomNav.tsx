"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const OrderHistoryBottomNav = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigateToMenu = () => {
    router.push("/menu");
  };

  const handleAccount = () => {};

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 flex justify-between p-4 shadow">
      <div
        className="items-center flex flex-col cursor-pointer"
        onClick={handleNavigateToMenu}
      >
        <span className="material-symbols-rounded">menu_book</span>
        <p>メニューに戻る</p>
      </div>

      <button
        className="bg-gray-500 py-2 px-4 rounded text-white disabled:opacity-50"
        onClick={handleAccount}
        disabled={loading}
      >
        お会計
      </button>
    </nav>
  );
};

export default OrderHistoryBottomNav;
