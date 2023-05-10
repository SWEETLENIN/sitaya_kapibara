import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const MenuAdmConsole = () => (
  <Menu
      items={[
          {
              key: "Corr_menu",
              label: (<Link to="/admin/food">Корректировка блюд</Link>)
          },

      ]}
  />
);

export default MenuAdmConsole;
