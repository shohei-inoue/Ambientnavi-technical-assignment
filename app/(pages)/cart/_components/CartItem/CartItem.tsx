type CartItemProps = {
  title: string
  price: number
  quantity: number
  sub_variable: string
  sub_variable_price: number
  sub_variable_quantity: number
}

const CartItem: React.FC<CartItemProps> = ({
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
          <div className="flex justify-around items-center">
            <button>
              <span className="material-symbols-rounded">delete</span>
            </button>
            <div>
              <button className="p-4 bg-gray-500 text-white">-</button>
              <span> {quantity} </span>
              <button className="p-4 bg-gray-500 text-white">+</button>
            </div>
          </div>
          <div className="flex justify-between border-t-2 border-dashed border-gray-300">
              <h3>{sub_variable}</h3>
              <p>{sub_variable_quantity}点</p>
              <p>{sub_variable_price}円</p>
            </div>
        </li>
  )
}

export default CartItem