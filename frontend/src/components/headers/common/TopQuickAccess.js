import {Link} from 'react-router-dom';

const TreeMenuLink = () => (
  <Link className='header-quick-access' to="/menu">Дерево меню</Link>
);

const AdvertsLink = () => (
  <Link className='header-quick-access' to="/adverts">Объявления</Link>
);


const topQuickAccessArray = [<TreeMenuLink/>, <AdvertsLink/>];

export default topQuickAccessArray;
