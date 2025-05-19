"use client";

import Heading from "@/app/components/Heading/Heading";
import CartBottomNav from "../CartNav/CartBottomNav";
import CartContent from "../CartContent/CartContent";
import { useEffect, useState } from "react";
import { CartData } from "@/app/types/types";

const CartContents = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCart = async () => {

      try {
        const res = await fetch(`/api/web/cart/`);
        if (!res.ok) throw new Error("カート取得に失敗しました");
        const data = await res.json();
        console.log(data)
        setCartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <Heading level={1}>カート</Heading>
      {/* <CartContent /> */}
      <CartBottomNav />
    </div>
  );
};

export default CartContents;
