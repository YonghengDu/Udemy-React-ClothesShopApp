import { useContext, useState, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import "./categories-preview.component.scss";
import { useSelector } from 'react-redux'
import { selectCurrentCategories } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCurrentCategories);
  // const { categoriesMap, setCategoriesMap } = useContext(CategoriesContext);
  return (
    <div className="category-preview-container">
        {/**{currentProducts.map((item) => (
        <h1 key={item.id}>{item.name}</h1>
         ))}**/}
        {
          Object.keys(categoriesMap).map( title => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            )
          }
          )
        }
    </div>
  );
};
export default CategoriesPreview;
