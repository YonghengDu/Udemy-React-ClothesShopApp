import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) => {
  return { type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: boolean };
};


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
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const addItemToCart = (cartItems,productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return {type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
};

export const removeItemToCart = (cartItems,cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return {type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
};

export const clearItemFromCart = (cartItems,cartItemToRemove) => {
  const newCartItems = removeThisKindOfItem(cartItems, cartItemToRemove);
  return {type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
};
