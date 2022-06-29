import { useContext,useState } from "react";
import { ProductsContext } from "../../components/contexts/product.context";
import ProductCard from "../../components/prooduct-card/prooduct-card.component";
import "./shop.component.scss"
const Shop = () => {
  const { currentProducts,setCurrentProducts } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {/**{currentProducts.map((item) => (
        <h1 key={item.id}>{item.name}</h1>
      ))}**/}
      {
        currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  );
};
export default Shop;
