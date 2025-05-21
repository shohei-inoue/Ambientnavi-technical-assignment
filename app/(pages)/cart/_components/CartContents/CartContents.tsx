"use client";

import Heading from "@/app/components/Heading/Heading";
import CartBottomNav from "./CartBottomNav";
import { useEffect, useState } from "react";
import { Cart, CartItem } from "@/app/actions/web/cart/domain/Cart";
import CartContent from "../CartContent/CartContent";
import {
  handleDecrementCartItem,
  handleGetCart,
  handleIncrementCartItem,
  handleRemoveCartItem,
} from "@/app/actions/web/cart/controller/CartController";

type CartContentProps = {
  cart: Cart;
};

const CartContents: React.FC<CartContentProps> = ({ cart }) => {
  const [items, setItems] = useState<CartItem[]>(cart.items);
  const [totalPrice, setTotalPrice] = useState<number>(cart.totalPrice);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => {
      const price = item.menu?.price || 0;
      return sum + price * item.quantity;
    }, 0);
    setTotalPrice(newTotal);
  }, [items]);

  const menuInfoMap = Object.fromEntries(
    cart.items.map((item) => [
      item.menuId,
      {
        title: item.menu?.name || `メニュー#${item.menuId}`,
        price: item.menu?.price || 0,
      },
    ])
  );

  const handleIncrement = async (menuId: number) => {
    await handleIncrementCartItem(menuId);
    const updatedCart = await handleGetCart();
    setItems(updatedCart.items);
    setTotalPrice(updatedCart.totalPrice);
  };

  const handleDecrement = async (menuId: number) => {
    await handleDecrementCartItem(menuId);
    const updatedCart = await handleGetCart();
    setItems(updatedCart.items);
    setTotalPrice(updatedCart.totalPrice);
  };

  const handleDelete = async (menuId: number) => {
    await handleRemoveCartItem(menuId);
    const updatedCart = await handleGetCart();
    setItems(updatedCart.items);
    setTotalPrice(updatedCart.totalPrice);
  };

  return (
    <div>
      <Heading level={1}>カート</Heading>
      <CartContent
        items={items}
        totalPrice={totalPrice}
        menuInfoMap={menuInfoMap}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
      />
      <CartBottomNav />
    </div>
  );
};

export default CartContents;
