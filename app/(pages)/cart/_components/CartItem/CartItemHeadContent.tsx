import React from "react";

type CartItemHeadContentProps = {
  title: string;
  price: number;
};

const CartItemHeadContent: React.FC<CartItemHeadContentProps> = ({
  title,
  price,
}) => {
  return (
    <div className="flex justify-between mb-2">
      <h2 className="font-bold">{title}</h2>
      <p className="text-right">{price}円</p>
    </div>
  );
};

export default CartItemHeadContent;
