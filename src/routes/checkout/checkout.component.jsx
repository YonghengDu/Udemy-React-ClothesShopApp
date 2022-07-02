import "./checkout.component.scss"
import { useContext } from "react"
import { CartContext } from "../../components/contexts/cart.context"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
const Checkout = () => { 
  const { cartItems,totalPrice } = useContext(CartContext);
  
    return (
        <div className="checkout-container">
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Description</span>
            </div>
            <div className="header-block">
              <span>Quantity</span>
            </div>
            <div className="header-block">
              <span>Price</span>
            </div>
            <div className="header-block">
              <span>Remove</span>
            </div>
          </div>
            {
              cartItems[0] ? 
              cartItems.map( (cartItem) => {
                const { id } = cartItem;
                {/**<br />
                    <span onClick={ () => removeItemToCart(cartItem) }>decrement</span>
                    <br />
                <span onClick={ () => addItemToCart(cartItem) }>increment</span>**/}
                return (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                )
              } )
              :
              <div>Your cart is empty</div>
            }
            <span className="total">Total Price ￥{totalPrice}</span>
        </div>
    )
 }
export default Checkout