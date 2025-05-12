"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MenuBottomNav = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/cart");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 flex justify-between items-center p-4 shadow">
      <div className="items-center flex flex-col cursor-pointe">
        <Link href="/order-history">
          <span className="material-symbols-rounded">receipt_long</span>
          <p>注文履歴</p>
        </Link>
      </div>
      <button
        className="bg-gray-500 py-2 px-4 rounded text-white cursor-pointer"
        onClick={handleClick}
      >
        カートを確認
      </button>
    </nav>
  );
};

export default MenuBottomNav;
