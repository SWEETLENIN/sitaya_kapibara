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
                   <a href="https://vk.com/" target="_blank" rel="noreferrer">
                       <Image href='https://vk.com/agrimer2007' src='https://cdn-icons-png.flaticon.com/512/25/25684.png' preview={false} height={30} width={30}/>
                   </a>
               </Col>
               <Col offset={2}>
                   <a href="https://telegram.org/" target="_blank" rel="noreferrer">
                       <Image src='https://cdn-icons-png.flaticon.com/512/5968/5968940.png' preview={false} height={30} width={30}/>
                   </a>
               </Col>
           </Row>
       </Col>
       <Col offset={8}>
           Сытая капибара <CopyrightOutlined /> {new Date().getFullYear()}г.
       </Col>
       <Col offset={5}>
           <Row>
               <Col>
                   <Image src='https://cdn-icons-png.flaticon.com/512/196/196566.png' preview={false} height={30} width={30}/>
               </Col>
               <Col offset={2}>
                   <Image src='https://cdn1.iconfinder.com/data/icons/cash-card-add-on/48/v-18-512.png' preview={false} height={30} width={30}/>
               </Col>
               <Col offset={2}>
                   <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' preview={false} height={20} width={40}/>
               </Col>
               <Col offset={2}>
                   <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mir-logo.SVG.svg/2560px-Mir-logo.SVG.svg.png' preview={false} height={20} width={40}/>
               </Col>
           </Row>
       </Col>
   </Row>
  </Footer>
);

export default FooterCustom
