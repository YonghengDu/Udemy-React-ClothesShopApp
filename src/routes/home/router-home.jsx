import { Outlet } from 'react-router-dom';
import Derectory from '../../components/derectory/derectory.compoent';

const Home = () => {
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.imgur.com/lEcgAsF.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.imgur.com/jVjd2Bk.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.imgur.com/5sS6zDV.png"
    },
    {
      "id": 4,
      "title": "women's",
      "imageUrl": "https://i.imgur.com/V0DMXPC.png"
    },
    {
      "id": 5,
      "title": "men's",
      "imageUrl": "https://i.imgur.com/YZmsCmK.png"
    }
  ];
  return (
    <div>
      <Outlet />
      <Derectory categories={categories}/>
    </div>
  );
};

export default Home;
