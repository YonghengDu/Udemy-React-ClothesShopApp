import "./shop.component.scss";
import CategoriesPreview from "../categories-preview.component/categories-preview.component";
import { Routes,Route } from 'react-router-dom'
import Category from "../category/category.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      {/* 
        path=":param"
        表示将路由地址param作为参数传递给element中的组件，参数名就是param
        组件用useParams方法来接收param
      */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;