import OrderHistoryItem from "../OrderHistoryItem/OrderHistoryItem";

type OrderHistoryItemData = {
  title: string;
  price: number;
  quantity: number;
  sub_variable: string;
  sub_variable_price: number;
  sub_variable_quantity: number;
};

const OrderHistoryItemDataList: OrderHistoryItemData[] = [
  {
    title: "ちょこっとポテトフライ",
    price: 99,
    quantity: 1,
    sub_variable: "バター醤油",
    sub_variable_price: 0,
    sub_variable_quantity: 0,
  },
  {
    title: "ちょこっとポテトフライ",
    price: 99,
    quantity: 1,
    sub_variable: "バター醤油",
    sub_variable_price: 0,
    sub_variable_quantity: 0,
  },
  {
    title: "ちょこっとポテトフライ",
    price: 99,
    quantity: 1,
    sub_variable: "バター醤油",
    sub_variable_price: 0,
    sub_variable_quantity: 0,
  },
];

const OrderHistoryContent = () => {
  return (
    <div>
      <ul>
        {OrderHistoryItemDataList.map((item, index) => (
          <OrderHistoryItem
            key={index}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            sub_variable={item.sub_variable}
            sub_variable_price={item.sub_variable_price}
            sub_variable_quantity={item.sub_variable_quantity}
          />
        ))}
      </ul>
      <div className="flex justify-between items-center p-4">
        <h3>合計金額</h3>
        <p>297円</p>
      </div>
    </div>
  );
};

export default OrderHistoryContent;
