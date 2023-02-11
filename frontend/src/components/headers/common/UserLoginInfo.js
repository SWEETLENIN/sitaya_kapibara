import {Typography} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const {Text} = Typography;


const UserLoginInfo = ({auth}) => (
  <>
    <UserOutlined style={{marginRight: '5px'}}/>
    <Text className='margin-right-10'>
      {auth?.token?.login ? auth.token.login : "Гость"}
    </Text>
  </>
);

export default UserLoginInfo;
