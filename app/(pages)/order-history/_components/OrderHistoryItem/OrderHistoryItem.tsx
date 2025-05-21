type OrderHistoryItemProps = {
  title: string;
  price: number;
  quantity: number;
  sub_variable: string;
  sub_variable_price: number;
  sub_variable_quantity: number;
};

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  title,
  price,
  quantity,
  sub_variable,
  sub_variable_price,
  sub_variable_quantity,
}) => {
  return (
    <li className="flex flex-col border-b-2 border-gray-300 p-4">
      <div className="flex justify-between">
        <h2>{title}</h2>
        <p>{price}円</p>
      </div>
      <div className="text-right">
        <p> {quantity} </p>
      </div>
      <div className="flex justify-between border-t-2 border-dashed border-gray-300">
        <h3>{sub_variable}</h3>
        {/* <p>{sub_variable_quantity}点</p> */}
        {/* <p>{sub_variable_price}円</p> */}
      </div>
    </li>
  );
};

export default OrderHistoryItem;
