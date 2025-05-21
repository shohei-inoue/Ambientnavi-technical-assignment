"use client";

import { useState } from "react";

type MenuItemBottomNavProps = {
  menuId: number;
  quantity: number;
};

const MenuItemBottomNav: React.FC<MenuItemBottomNavProps> = ({
  menuId,
  quantity,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/web/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuId,
          quantity,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "カート追加に失敗しました");
      }

      alert("カートに追加しました！");
    } catch (err: any) {
      console.error("カート追加失敗:", err);
      alert(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 flex justify-end items-center p-4 shadow">
      <button
        className="bg-gray-500 py-2 px-4 rounded text-white disabled:opacity-50"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "追加中..." : "カートに追加"}
      </button>
    </nav>
  );
};

export default MenuItemBottomNav;
