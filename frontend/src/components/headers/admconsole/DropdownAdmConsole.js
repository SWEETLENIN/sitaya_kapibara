import {Dropdown, Space, Typography} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import MenuAdmConsole from './MenuAdmConsole.js';

const {Link} = Typography;

const DropdownAdmConsole = () => (
  <div className='margin-right-10'>
      <Dropdown overlay={<MenuAdmConsole/>} trigger={["click"]}>
          <Link className='header-quick-access' >
            <Space>
                Консоль администратора
                <DownOutlined/>
            </Space>
          </Link>
      </Dropdown>
  </div>
);

export default DropdownAdmConsole;
