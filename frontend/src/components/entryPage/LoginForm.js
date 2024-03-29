import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Card, Alert } from 'antd';


const {Text, Link} = Typography;

const LoginForm = ({auth}) => {
  const [errMsg, setErrMsg] = useState();
  const navigate = useNavigate();
  let discor_link=auth.config.getRestorePasswordUrlForDiscor(window.location.href);


  const handleFinish = async (values) => {
    console.log('Received values of form: ', values);
    const res = await auth.loginUser(values);
    if (res && res.success) {
      setErrMsg(null);
      navigate("/");
    } else {
      const detail =  res?.error.detail;
      setErrMsg(
        detail && typeof detail === "string" ? detail : "Неправильный логин/пароль"
      );
    }
  };

  return (
    <Card>
      <Form name="login" onFinish={handleFinish}>
        {
          errMsg
          ? <Alert message={errMsg} type="error" closable onClose={() => setErrMsg(null)}/>
          : <></>
        }
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите логин!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите пароль!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default LoginForm;
