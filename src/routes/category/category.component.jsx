import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./category.component.scss";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/prooduct-card/prooduct-card.component";
import { useSelector } from 'react-redux'
import { selectCurrentCategories } from "../../store/categories/categories.selector";

const Category = () => {

  const { category } = useParams();
  const categoriesMap = useSelector(selectCurrentCategories);
  // const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>                         
  );
};
export default Category;
