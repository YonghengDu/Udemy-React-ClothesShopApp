import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.style.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { selectIsCartOpen,selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { useDispatch } from "react-redux";

const CartIcon = () => {
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  const dispatch = useDispatch();
  // const { isCartOpen,setIsCartOpen,cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};
export default CartIcon;