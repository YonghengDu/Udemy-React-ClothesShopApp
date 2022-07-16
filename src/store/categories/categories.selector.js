import { createSelector } from "reselect";
// state可以看做store对象
const selectCategoryReducer = (state) => state.categories;

// 由于数据类型是对象，useSelector无法分辨一致性，所以需要用到createSelector和memory

/**
 * createSelector(param1,param2)
 * 该函数会将param1即reducer用类似memory函数的方式储存起来
 * 只有当新的param1和储存的param1不一致时，才会执行param2的函数
 * @param1:array类型  储存用于生成selector的数据，可以有多个，但每个都和param2的多个入参对应
 * @param2:函数       入参就是param1的数据
 */
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categoriesArr
);

export const selectCurrentCategories = createSelector(
  [selectCategories], 
  (categories) => {
  return categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
});

// export const selectCurrentCategories = (state) => {
//   console.log("selector fired");
//   return state.categories.categoriesArr.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// }

export const selsectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading

)