import "./checkoutout-item.component.scss"
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { addItemToCart,removeItemToCart,clearItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useDispatch } from "react-redux";

const CheckoutItem = ( {cartItem} ) => { 
  const { name,price,imageUrl,quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)
  // const { clearItemFromCart,addItemToCart,removeItemToCart } = useContext(CartContext);
  const removeItem = () => dispatch(removeItemToCart(cartItems,cartItem));
  const addItem = () => dispatch(addItemToCart(cartItems,cartItem));
  const clearItem = () => dispatch(clearItemFromCart(cartItems,cartItem));
  return(
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={ removeItem } >&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={ addItem }>&#10095;</div>
      </span>
      <span className="price">{price*quantity}</span>
      <div className="remove-button" onClick={ clearItem }>&#10005;</div>
    </div>
  )
}
export default CheckoutItem