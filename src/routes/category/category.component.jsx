import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import "./category.component.scss"
import { CategoriesContext } from '../../components/contexts/categories.context';
import ProductCard from '../../components/prooduct-card/prooduct-card.component';

const Category = () => {
    //
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext)
    const [products,setProducts] = useState([]);
    useEffect( () => {
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

    return (
      <div className='category-container'>
        {
            products &&
            products.map( (product) => (
                <ProductCard key={product.id} product={product} />
            ) )
        }
      </div>
    )
}
export default Category