import "./cart-dropdown.component.scss"
import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"
import { CartContext } from "../contexts/cart.context"
import { useContext } from "react"
import { useNavigate } from 'react-router-dom'

const CartDropdown = () => {
    const { cartItems,totalPrice } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckout = () => { navigate('/checkout') }

    return (
        <div className="cart-dropdown-container">
          <div className="cart-items">
          {
             cartItems.map( (item) => (
              <CartItem key={item.id} cartItem = {item} />
             ))
          }
          </div>
          <div>Total Price ￥{totalPrice}</div>
          <Button buttonType={"inverted"} onClick={goToCheckout}>CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown