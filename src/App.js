import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/router-home";
import Navigation from "./routes/navigation/router-navigation";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return <h1>This is Shop page</h1>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
