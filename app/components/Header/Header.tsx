"use client";

import { useState } from "react";
import HeaderHamBurgerMenu from "../HeaderHamburgerMenu/HeaderHamBurgerMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white p-4 relative">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-center w-full">
          mobile order by ambientnavi technical assignment
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute right-4 top-4"
          aria-label="メニューを開く"
        >
          <span className="material-symbols-rounded text-white text-3xl">
            menu
          </span>
        </button>
      </div>

      {menuOpen && (
        <HeaderHamBurgerMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
