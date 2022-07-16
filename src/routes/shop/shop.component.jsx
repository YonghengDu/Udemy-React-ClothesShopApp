import "./shop.component.scss";
import CategoriesPreview from "../categories-preview.component/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Category from "../category/category.component";
import { setCategoriesArr } from "../../store/categories/categories.action";
import { useDispatch } from 'react-redux'
import { getCategoriesAndDocuments } from "../../utilities/fire-base/utility-firebase";
import { fetchCategotiesAsync } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
  // 组件向categoriesReducer发dispatch,将从firebase获取到的商品map存到categoriesReducer中
  useEffect(() => {
    dispatch(fetchCategotiesAsync());
  }, []);

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
