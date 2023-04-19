import {Layout} from 'antd'
import { CopyrightOutlined } from '@ant-design/icons';

const {Footer} = Layout

const FooterCustom = () => (
  <Footer className="footer">
    Сытая капибара <CopyrightOutlined /> {new Date().getFullYear()}г.
  </Footer>
);

export default FooterCustom
