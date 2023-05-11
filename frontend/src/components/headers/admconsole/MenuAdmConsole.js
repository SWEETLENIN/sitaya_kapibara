import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const MenuAdmConsole = () => (
  <Menu
      items={[
          {
              key: "Corr_menu",
              label: (<Link to="/admin/food">Корректировка блюд</Link>)
          },
          {
              key: "Corr_rest",
              label: (<Link to="/admin/rest">Корректировка ресторанов</Link>)
          },

      ]}
  />
);

export default MenuAdmConsole;
