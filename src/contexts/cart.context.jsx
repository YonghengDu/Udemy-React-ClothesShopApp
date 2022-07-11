import { createContext, useState, useEffect, useReducer } from "react";

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

//1.找到需要remove的商品
//2.如果数量为1，移除它；否则数量减一
//3.返回新的cartItem数组
const removeCartItem = (cartItems, cartItemToRemove) => {
  //用find方法找到该商品
  console.log("inRemoveCartItem");

  const exitingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (exitingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== exitingCartItem.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === exitingCartItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeThisKindOfItem = (cartItems, cartItemToRemove) => {
  // const exitingCartItem = cartItems.find( cartItem =>
  //   cartItem.id === cartItemToRemove.id
  // )
  // if(exitingCartItem){
  //   return cartItems.filter( cartItem => {
  //     cartItem.id !== cartItemToRemove.id
  //   } )
  // }
  return cartItems.filter((cartItem) =>
    cartItem.id !== cartItemToRemove.id
  );
};




//isCartOpen保存是否显示cart界面
//cartItems中保存cart中的数据,除了商品数据还有商品数量
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  totalPrice: 0
});


const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0
}

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
  SET_CART_ITEMS:'SET_CART_ITEMS'
}

//reducer只用关心state中的数据变化了，然后更新state即可
const cartReducer  = (state,action) => {
  const { type,payload } = action
  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS :
      return{
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN :
      console.log(payload);
      return{
        ...state,
        isCartOpen:payload
      }
    default :
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}


export const CartProvider = ({ children }) => {

  const [ { isCartOpen,cartItems,cartCount,totalPrice },dispatch ] = useReducer(cartReducer,INITIAL_STATE)
  
  const setIsCartOpen = (bool) => {
    dispatch({ type:CART_ACTION_TYPES.SET_IS_CART_OPEN , payload:bool })
  }

  /** 
   * updateCartItemsReducer需要
   * （1）生成newTotalPrice并更新totalPrice
   * （2）生成newCartCount并更新cartCount
   * （3）更新cartItems
  */
  const updateCartItemsReducer = (newCartItems) => {
    const newTotalPrice = newCartItems.reduce( (total,cartItem) =>
      total + (cartItem.price * cartItem.quantity)
    ,0);
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    dispatch({ type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:{
      totalPrice:newTotalPrice,
      cartCount:newCartCount,
      cartItems:newCartItems
    } })
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems,cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeThisKindOfItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    totalPrice
  };
  /* 
  -----------------------------------------------------------------------------------
  */
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [totalPrice,setTotalPrice] = useState(0);

  //当cartItems内容变化时，totalPrice也随之变化
  // useEffect( () => {
  //   const newTotalPrice = cartItems.reduce( (total,cartItem) =>
  //     total + (cartItem.price * cartItem.quantity)
  //   ,0);
  //   setTotalPrice(newTotalPrice);
  // },[cartItems])

  // //当cartItems内容变化时，cartCount显示当前购买的总数量
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // const addItemToCart = (productToAdd) => {
  //   setCartItems(addCartItem(cartItems, productToAdd));
  // };
  // const removeItemToCart = (cartItemToRemove) => {
  //   console.log("inRemoveItemToCart");
  //   setCartItems(removeCartItem(cartItems, cartItemToRemove));
  // };
  // const clearItemFromCart = (cartItemToRemove) => {
  //   setCartItems(removeThisKindOfItem(cartItems, cartItemToRemove));
  // };

  // const value = {
  //   isCartOpen,
  //   setIsCartOpen,
  //   addItemToCart,
  //   removeItemToCart,
  //   clearItemFromCart,
  //   cartItems,
  //   cartCount,
  //   totalPrice
  // };
  /*
  -------------------------------------------------------------------------------------
  */

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
