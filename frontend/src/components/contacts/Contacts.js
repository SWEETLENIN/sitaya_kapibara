import {Pagination, Spin, Typography, Badge, message, Card, Col, Row, Button, Divider, Avatar, Image, Input, Form} from "antd";
import {useEffect, useState} from 'react';
import FoodClient from "../../api/FoodClient";
import FileClient from "../../api/FileClient";
import EmployeeClient from "../../api/EmployeeClient";
import RestarauntClient from "../../api/RestarauntClient";

const {Title} = Typography;
const { Meta } = Card;



const Contacts = () => {
    const [employee, setEmployee] = useState([]);
    const [restaraunt, setRestaraunt] = useState([]);


    const restarauntClient=new RestarauntClient();
    const employeeClient=new EmployeeClient();

    const getEmployees = async () =>{
        const response= await employeeClient.getEmplyees()
        if (!response.success) {
            return message.error('Ошибка получения');
        }
        setEmployee(response.data)
        return
    }


    const getRestaraunts = async () =>{
        const response = await restarauntClient.getRestaraunt()
        if (!response.success) {
            return message.error('Ошибка получения');
        }
        setRestaraunt(response.data)
        return
    }


    useEffect(() => {
        const fetchEmployee = async () => {
            getEmployees();
            getRestaraunts();
            // getFoodByKitchen(1);
            // getFoodByKitchen(2);
            // getFoodByKitchen(3);
            // getFoodByKitchen(4);
        };
        fetchEmployee();
    }, []);



    const getEmployeeCards = (employees) => {
        return (employees.map(employeeElem => <>
            <Badge.Ribbon text={employeeElem['position_name']} color='#F97B7B' placement='end'>
                <Card size='small' key={employeeElem['employee_id']}
                      cover={
                          <img
                              alt="example"
                              width={300}
                              height={250}
                              src={
                                  // console.log(employeeElem.file_fk)}
                                  employeeElem.file_fk
                                  ? `http://localhost:8000/api/v1/files/${employeeElem.file_fk}`
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddZhgstwlbS72tVE48PuxqZwsglqpJdsj3A&usqp=CAU"}
                          />
                      }
                      style={{
                          width: 300,
                      }}>
                    <Meta
                        title={`${employeeElem['employee_name']} ${employeeElem['employee_surname']}`}
                    />
                </Card>
            </Badge.Ribbon>
        </>))
    }

    const getRestarauntCard = (restaraunts) => {
        return (restaraunts.map(restElem => <>
                <Card key={restElem['rest_id']}>
                    Адрес: {restElem['city']}, {restElem['street']} {restElem['building']}
                    <br/>
                    Часы работы: {restElem['work_time']}
                    <br/>
                    Количество мест в ресторане: {restElem['number_of_seats']}
                </Card>

        </>))
    }

    return (
        <>
            {/*<Title level={1}>Каталог</Title>*/}
            {employee.length===0 || employee.length===null
                ?
                <>
                    <h2>Работников НЕТ!</h2>
                </>
                :
                employee.length>0
                    ?
                    <>
                        <Row justify='center'>
                            <Col>
                                <Divider plain><Title level={3}>Работники</Title></Divider>
                                <Row justify='center'>
                                    {getEmployeeCards(employee)}
                                </Row>
                                <Divider><Title level={3}>Рестораны</Title></Divider>
                                <Row justify='center'>
                                    {getRestarauntCard(restaraunt)}
                                </Row>
                            {/*    <Divider/>*/}
                            {/*    <Row >*/}
                            {/*        <Form*/}
                            {/*            name="basic"*/}
                            {/*            labelCol={{*/}
                            {/*                span: 4,*/}
                            {/*            }}*/}
                            {/*            wrapperCol={{*/}
                            {/*                span: 16,*/}
                            {/*            }}*/}
                            {/*            style={{*/}
                            {/*                width: 800,*/}
                            {/*            }}*/}
                            {/*            onFinish={(values) => {*/}
                            {/*                console.log('Success:', values);*/}
                            {/*            }}*/}
                            {/*        >*/}

                            {/*            <Form.Item*/}
                            {/*                label="Имя"*/}
                            {/*                name="name"*/}
                            {/*                rules={[*/}
                            {/*                    {*/}
                            {/*                        required: true,*/}
                            {/*                        message: 'Please input your name!',*/}
                            {/*                    },*/}
                            {/*                ]}*/}
                            {/*            >*/}
                            {/*                <Input/>*/}
                            {/*            </Form.Item>*/}
                            {/*            <Form.Item*/}
                            {/*                label="email"*/}
                            {/*                name="email"*/}
                            {/*                rules={[*/}
                            {/*                    {*/}
                            {/*                        required: true,*/}
                            {/*                        message: 'Please input your email!',*/}
                            {/*                    },*/}
                            {/*                ]}*/}
                            {/*            >*/}
                            {/*                <Input />*/}
                            {/*            </Form.Item>*/}
                            {/*            <Form.Item*/}
                            {/*                label="Телефон"*/}
                            {/*                name="phone"*/}
                            {/*                rules={[*/}
                            {/*                    {*/}
                            {/*                        message: 'Please input your phone!',*/}
                            {/*                    },*/}
                            {/*                ]}*/}
                            {/*            >*/}
                            {/*                <Input />*/}
                            {/*            </Form.Item>*/}
                            {/*            <Form.Item>*/}
                            {/*                <Button type="primary" htmlType="submit">*/}
                            {/*                    Подписаться на рассылку*/}
                            {/*                </Button>*/}
                            {/*            </Form.Item>*/}
                            {/*        </Form>*/}
                            {/*    </Row>*/}
                            {/*    <Divider/>*/}
                            {/*    <Title level={3}>Наши блюда</Title>*/}
                            {/*    <Row justify='center'>*/}
                            {/*        {getFoodCardByKitchen(food.slice(4))}*/}
                            {/*    </Row>*/}
                            {/*    <Divider/>*/}

                            {/*    <Title level={3}>Мы на карте</Title>*/}
                            {/*    <p>*/}
                            {/*        <Image height={350}*/}
                            {/*               width={600}*/}
                            {/*               src='https://sm.mashable.com/t/mashable_in/photo/default/maps_dmpu.1248.jpg'/>*/}
                            {/*    </p>*/}
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                        <Spin tip="Загрузка..."/>
                    </>
            }
        </>
    );
};

export default Contacts;
