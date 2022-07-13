import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utilities/fire-base/utility-firebase";

import Home from "./routes/home/router-home";
import Navigation from "./routes/navigation/router-navigation";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";


const App = () => {
  const dispatch = useDispatch();
  // 组件向userReducer发dispatch
  useEffect(() => {
    //第一次渲染就会执行
    const unsuscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
      // console.log(user);
    });
    //当UserProvider组件unmount时会执行return
    return unsuscribe;
  }, []);



  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/**
          path="shop/*"表示只要路由前面是shop，都显示Shop组件
          在Shop组建中可以写属于Shop自己的路由
        **/}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
