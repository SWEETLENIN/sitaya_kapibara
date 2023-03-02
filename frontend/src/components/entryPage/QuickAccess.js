import {Row, Col, Card, Typography} from 'antd';
import {Link} from 'react-router-dom';

const {Title} = Typography;

const QuickAccess = () => (
  <>
  <Title level={5} style={{textAlign: 'left', marginTop: '5px'}}>
    БЫСТРЫЙ ДОСТУП
  </Title>
  <Row gutter={[16, 16]}>
    <Col span={12}>
      <Link to="/menu">
        <Card hoverable={true}>
          ДЕРЕВО МЕНЮ
        </Card>
      </Link>
    </Col>
    <Col span={12}>
      <Link to="/adverts">
        <Card hoverable={true}>
          ОБЪЯВЛЕНИЯ
        </Card>
      </Link>
    </Col>
  </Row>
  </>
)

export default QuickAccess;
