import {Card, Typography} from "antd";
import LogoutLinkButton from '../headers/common/LogoutLinkButton';

const {Title} = Typography;

const AlreadyAuthed = ({auth}) => {

  return (
    <Card>
      <Title level={4}>Вы уже вошли как "{auth.token.login}"</Title>
      <LogoutLinkButton auth={auth}/>
    </Card>
  )
};

export default AlreadyAuthed;
