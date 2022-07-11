import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments } from "../utilities/fire-base/utility-firebase"
import { getCategoriesAndDocuments } from "../utilities/fire-base/utility-firebase"

//firebase服务端有了数据后不再需要这个
// import SHOP_DATA from "../../shop-data.js"

export const CategoriesContext = createContext({
    categoriesMap:{}
})

{/**export const ProductsContext = createContext({
    currentProducts:[],
    setCurrentProducts:()=>null
})**/}

export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({});

    //将SHOP_DATA发送到firebase
    // useEffect( () => {
    //     addCollectionAndDocuments("categories",SHOP_DATA)
    // },[])
    useEffect( () => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            //categoryMap就是数据库中商品SHOP_DATA
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[])

    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}