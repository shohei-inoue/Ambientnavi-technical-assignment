import Heading from "@/app/components/Heading/Heading"
import CartBottomNav from "../CartNav/CartBottomNav"
import CartContent from "../CartContent/CartContent"

const CartContents = () => {
  return (
    <div>
      <Heading level={1}>Cart</Heading>
      <CartContent />
      <CartBottomNav />
    </div>
  )
}

export default CartContents