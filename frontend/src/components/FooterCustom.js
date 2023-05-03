import {Layout, Row, Col, Image} from 'antd'
import { CopyrightOutlined } from '@ant-design/icons';

const {Footer} = Layout

const FooterCustom = () => (
  <Footer className="footer">
   <Row>
       <Col>
           <Row>
               +79853459834
           </Row>
           <Row>
               +79853459424
           </Row>
           <Row>
               <Col>
                   <Image src='https://cdn-icons-png.flaticon.com/512/25/25684.png' height={30} width={30}/>
               </Col>
               <Col offset={2}>
                   <Image src='https://cdn-icons-png.flaticon.com/512/5968/5968940.png' height={30} width={30}/>
               </Col>
           </Row>
       </Col>
       <Col offset={8}>
           Сытая капибара <CopyrightOutlined /> {new Date().getFullYear()}г.
       </Col>
       <Col offset={5}>
           <Row>
               <Col>
                   <Image src='https://cdn-icons-png.flaticon.com/512/196/196566.png' height={30} width={30}/>
               </Col>
               <Col offset={2}>
                   <Image src='https://cdn1.iconfinder.com/data/icons/cash-card-add-on/48/v-18-512.png' height={30} width={30}/>
               </Col>
               <Col offset={2}>
                   <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' height={20} width={40}/>
               </Col>
               <Col offset={2}>
                   <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mir-logo.SVG.svg/2560px-Mir-logo.SVG.svg.png' height={20} width={40}/>
               </Col>
           </Row>
       </Col>
   </Row>
  </Footer>
);

export default FooterCustom
