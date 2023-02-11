import {Dropdown, Space, Typography} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import MenuDocuments from './MenuDocuments.js';

const {Link} = Typography;

const DropdownDocuments = () => (
  <div className='margin-right-10'>
      <Dropdown arrow={true} overlay={<MenuDocuments/>} trigger={["click"]}>
          <Link className='header-quick-access'>
            <Space>
                Документы
                <DownOutlined/>
            </Space>
          </Link>
      </Dropdown>
  </div>
);


export default DropdownDocuments;
