import {Typography, Button} from 'antd'
import {Link} from 'react-router-dom';

const {Title} = Typography;

const NotAuthed = () => (
  <>
    <Title>
      Срок действия сессии закончился.
      <br/>
      Необходимо зайти в СИС "Эффект" НП снова
    </Title>
    <Link to='/'>
      <Button>
        Перейти на главную
      </Button>
    </Link>
  </>
);

export default NotAuthed;
