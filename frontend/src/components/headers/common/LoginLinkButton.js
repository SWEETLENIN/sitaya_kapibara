import {Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';


const LoginLinkButton = () => (
      <Link to='/'>
        <Button icon={<PoweroffOutlined />} >
          Вход
        </Button>
      </Link>
);

export default LoginLinkButton;
