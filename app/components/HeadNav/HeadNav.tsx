"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderHamBurgerMenu from "../HeaderHamburgerMenu/HeaderHamBurgerMenu";

const HeadNav = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // TODO クエリパラメータを定義次第変更
  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-100 shadow flex items-center p-4">
      <button
        className="flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <span className="material-symbols-rounded">arrow_back_ios</span>
        <p>戻る</p>
      </button>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute right-4 top-4"
        aria-label="メニューを開く"
      >
        <span className="material-symbols-rounded text-black text-3xl">
          menu
        </span>
      </button>
      {menuOpen && (
        <HeaderHamBurgerMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default HeadNav;
