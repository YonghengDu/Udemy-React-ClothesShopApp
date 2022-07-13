import "./product-card.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { addItemToCart } from "../../store/cart/cart.action";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useDispatch } from "react-redux";

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const { name,imageUrl,price } = product;
  const cartItems = useSelector(selectCartItems);
  // const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => dispatch(addItemToCart(cartItems,product));
  return (
    <div className="product-card-container">
      <img src={imageUrl}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={"inverted"} onClick={addProductToCart}>Add to cart</Button>
    </div>
  );
};
export default ProductCard;
