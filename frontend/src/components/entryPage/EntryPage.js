import {Col, Row} from "antd";
import Greetings from "./Greetings.js";
import LoginForm from "./LoginForm.js";
import AlreadyAuthed from "./AlreadyAuthed.js";
import QuickAccess from "./QuickAccess.js";

const EntryPage = ({auth}) => {

  return (
      <Row>
        <Col span={14}>

        </Col>

        <Col span={8}>
          <Greetings/>
          {
            auth?.token
              ? <AlreadyAuthed auth={auth}/>
              : <LoginForm auth={auth}/>
          }
          <QuickAccess/>
        </Col>
        <Col span={2}></Col>
      </Row>
  )
}
export default EntryPage;
