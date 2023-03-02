import {Typography, Button} from 'antd'
import {Link} from 'react-router-dom';

const {Title} = Typography;

const NotFound = () => (
  <>
    <Title>
      Ошибка 404
      <br/>
      Страница не найдена
    </Title>
    <Link to='/'>
      <Button>
        Перейти на главную
      </Button>
    </Link>
  </>
);

export default NotFound;
