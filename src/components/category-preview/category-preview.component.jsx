import "./category-preview.component.scss"
import ProductCard from "../prooduct-card/prooduct-card.component"
import { useNavigate } from "react-router-dom"
const CategoryPreview = ( {title,products} ) => {
    const navigate = useNavigate();
    const goToDetailProducts = () => { navigate(`/shop/${title}`) }
    return (
        <div className="category-preview-container">
          <h2>
            <span className="title" onClick={goToDetailProducts}>{title.toUpperCase()}</span>
          </h2>
          <div className="preview">
            {
                products.filter( (_,index) => index < 4 )
                .map( product => (
                  <ProductCard key={product.id} product={product} />  
                ) )
            }
          </div>
        </div>
    )
}
export default CategoryPreview