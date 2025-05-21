"use client";

import { handleCreateOrder } from "@/app/actions/web/order/controller/OrderController";
import { useRouter } from "next/navigation";

const CartBottomNav = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await handleCreateOrder();
      alert("注文が確定しました");
      router.push("/menu");
    } catch (err) {
      console.error("注文エラー:", err);
      alert("注文に失敗しました");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gray-100 flex justify-center p-4 shadow">
      <button
        onClick={handleSubmit}
        className="bg-gray-500 py-2 px-4 rounded text-white"
      >
        注文を確定
      </button>
    </nav>
  );
};

export default CartBottomNav;
