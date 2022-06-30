import { createContext, useState, useEffect } from "react";

//1.判断cartItem中是否已经有了这种商品
//2.如果有，增加该商品的数量
//3.返回新的cartItem数组
const addCartItem = (cartItems, productToAdd) => {

  const exitingCartItem = cartItems.find(
    (cartItem) => productToAdd.id === cartItem.id
  );

  if (exitingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

//isCartOpen保存是否显示cart界面
//cartItems中保存cart中的数据,除了商品数据还有商品数量
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount:0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount,setCartCount] = useState(0);
  
  //当cartItems内容变化时，cartCount显示当前购买的总数量
  useEffect( () => {
    const newCartCount = cartItems.reduce( ( total , cartItem) =>
        (total + cartItem.quantity)
    , 0)
    console.log(newCartCount);
    setCartCount(newCartCount);
  } , [cartItems])


  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems,productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen ,addItemToCart ,cartItems ,cartCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
