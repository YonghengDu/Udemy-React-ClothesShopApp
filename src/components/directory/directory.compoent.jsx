import './directory.scss'
import DirectoryItem from "../directory-item/directory-item.component"
import { useNavigate } from 'react-router-dom'
const Directory = () => {
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.imgur.com/lEcgAsF.png",
      "route":"/shop/hats"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.imgur.com/jVjd2Bk.png",
      "route":"/shop/jackets"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.imgur.com/5sS6zDV.png",
      "route":"/shop/sneakers"
    },
    {
      "id": 4,
      "title": "women's",
      "imageUrl": "https://i.imgur.com/V0DMXPC.png",
      "route":"/shop/womens"
    },
    {
      "id": 5,
      "title": "men's",
      "imageUrl": "https://i.imgur.com/YZmsCmK.png",
      "route":"/shop/mens"
    }
  ];

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
export default Directory;
