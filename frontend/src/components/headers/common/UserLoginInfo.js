import {Typography} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const {Text} = Typography;


const UserLoginInfo = ({auth}) => (
  <>
    <UserOutlined style={{marginRight: '5px'}}/>
    <Text className='margin-right-10'>
      {auth?.token?.username ? auth.token.username : "Гость"}
    </Text>
  </>
);

export default UserLoginInfo;
