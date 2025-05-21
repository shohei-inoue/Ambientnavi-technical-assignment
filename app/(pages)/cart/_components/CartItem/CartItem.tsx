import CartItemHeadContent from "./CartItemHeadContent";
import CartItemQuantityField from "./CartItemQuantityField";
import CartItemSubVariableContent from "./CartItemSubVariableContent";

type CartItemProps = {
  title: string;
  price: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
  sub_variable?: string;
  sub_variable_price?: number;
  sub_variable_quantity?: number;
};

const CartItem: React.FC<CartItemProps> = ({
  title,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onDelete,
  sub_variable,
  sub_variable_price,
  sub_variable_quantity,
}) => {

  return (
    <li className="flex flex-col border-b-2 border-gray-300 p-4">
      <CartItemHeadContent title={title} price={price} />
      <CartItemQuantityField
        quantity={quantity}
        onDelete={onDelete}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      <CartItemSubVariableContent
        label={sub_variable}
        quantity={sub_variable_quantity}
        price={sub_variable_price}
      />
    </li>
  );
};

export default CartItem;
