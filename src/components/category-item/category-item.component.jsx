import './category-item.scss'

const CategoryItem = ({category}) => {
  // 这里为什么category要用大括号？可以理解为传递的参数实际上是props对象，category只是对象中的一个数据
  const {title,imageUrl} = category
  return (
    <div className="category-container">
      <div className="background-image" style={{backgroundImage:`url(${imageUrl})`}}>
      </div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  );
};
export default CategoryItem;
