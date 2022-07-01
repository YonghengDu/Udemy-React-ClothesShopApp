import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/router-home";
import Navigation from "./routes/navigation/router-navigation";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
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