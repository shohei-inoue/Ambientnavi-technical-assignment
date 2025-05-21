type CartItemQuantityFieldProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
};

const CartItemQuantityField: React.FC<CartItemQuantityFieldProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  onDelete,
}) => (
  <div className="flex justify-around items-center mb-2">
    <button onClick={onDelete}>
      <span className="material-symbols-rounded">delete</span>
    </button>
    <div className="flex items-center gap-2">
      <button
        className="p-2 bg-gray-500 text-white rounded"
        onClick={onDecrement}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="p-2 bg-gray-500 text-white rounded"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  </div>
);

export default CartItemQuantityField;
