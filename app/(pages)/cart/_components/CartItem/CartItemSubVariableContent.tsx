type CartItemSubVariableContentProps = {
  label?: string;
  quantity?: number;
  price?: number;
};

const CartItemSubVariableContent: React.FC<CartItemSubVariableContentProps> = ({
  label,
  quantity,
  price,
}) => {
  if (!label) return null;

  return (
    <div className="flex justify-between border-t-2 border-dashed border-gray-300 pt-2">
      <h3 className="text-sm">{label}</h3>
      <p className="text-sm">{quantity ?? 0}点</p>
      <p className="text-sm">{price ?? 0}円</p>
    </div>
  );
};

export default CartItemSubVariableContent;
