import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';

const LogoutLinkButton = ({auth}) => {
  const navigate = useNavigate();

  const logout = async () => {
    await auth.logoutUser();
    navigate("/");
  }

  return (
    <Button danger onClick={logout}>
      Выйти
    </Button>
  );
};


export default LogoutLinkButton;
