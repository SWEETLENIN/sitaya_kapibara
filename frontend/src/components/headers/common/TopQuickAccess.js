import {Link} from 'react-router-dom';
import {Divider} from "antd";

const KatalogLink = () => (
  <Link className='header-quick-access' to="/food">Каталог</Link>
);

const AboutLink = () => (
  <Link className='header-quick-access' to="/">О нас</Link>
);

const ConstactsLink = () => (
    <Link className='header-quick-access' to="/">Контакты</Link>
);


const topQuickAccessArray = [<Divider type='vertical'/>, <KatalogLink/>, <Divider type='vertical'/>,
    <AboutLink/>, <Divider type='vertical'/>,<ConstactsLink/>, <Divider type='vertical'/>];

export default topQuickAccessArray;
