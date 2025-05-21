import CartItem from "../CartItem/CartItem";
import { CartItem as CartItemType } from "@/app/actions/web/cart/domain/Cart";

type CartContentProps = {
  items: CartItemType[];
  totalPrice: number;
  menuInfoMap: Record<number, { title: string; price: number }>;
  onIncrement: (menuId: number) => void;
  onDecrement: (menuId: number) => void;
  onDelete: (menuId: number) => void;
};

const CartContent: React.FC<CartContentProps> = ({
  items,
  totalPrice,
  menuInfoMap,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => {
          const menu = menuInfoMap[item.menuId];
          return (
            <CartItem
              key={index}
              title={menu?.title || `メニュー #${item.menuId}`}
              price={menu?.price || 0}
              quantity={item.quantity}
              onIncrement={() => onIncrement(item.menuId)}
              onDecrement={() => onDecrement(item.menuId)}
              onDelete={() => onDelete(item.menuId)}
              sub_variable={item.note || ""}
              sub_variable_price={0}
              sub_variable_quantity={0}
            />
          );
        })}
      </ul>
      <div className="flex justify-between items-center p-4">
        <h2>注文合計金額</h2>
        <p>{totalPrice}円</p>
      </div>
    </div>
  );
};

export default CartContent;
