import {
    Pagination, Spin, Typography, Badge, message, Card, Col,
    Row, Button, Divider, Avatar, Image, List, Modal, Form, Input
} from "antd";
import {useEffect, useState} from 'react';
import FoodClient from "../../api/FoodClient";
import FileClient from "../../api/FileClient";
import {ShoppingCartOutlined} from "@ant-design/icons";
import timeMomentToStr from "../../helpers/timeMomentToStr";

const {Title} = Typography;
const { Meta } = Card;



const Food = () => {
    const [food, setFood] = useState([]);
    const [foodChuv, setFoodChuv] = useState([]);
    const [foodIsr, setFoodIsr] = useState([]);
    const [foodSib, setFoodSib] = useState([]);
    const [foodPrib, setFoodPrib] = useState([]);
    const [foodCount, setFoodCount] = useState([]);
    const [foodInCart, setFoodInCart] = useState([]);
    const [countCart, setCountCart] = useState(0);
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);
    const [isSuccessWindowOpen, setIsSuccessWindowOpen] = useState(false);
    const [form] = Form.useForm();



    const foodClient=new FoodClient();
    const fileClient=new FileClient();

    const getFoodByKitchen = async (kitched_id)=>{
        const response = await foodClient.getFoodByKitchen(kitched_id)
        if (!response.success) {
            return message.error('Ошибка получения');
        }
        switch (kitched_id){
            case 1:
                setFoodIsr(response.data)
                break
            case 2:
                setFoodChuv(response.data)
                break
            case 3:
                setFoodSib(response.data)
                break
            case 4:
                setFoodPrib(response.data)
                break
            default:
                message.error('Ошибка получкения')
        }
        return
    }

    const getFood = async () =>{
        const response= await foodClient.getAllFood()
        if (!response.success) {
            return message.error('Ошибка получения');
        }
        setFood(response.data)
        return
    }

    const getFoodCount = async () =>{
        const response= await foodClient.getFoodCount()
        if (!response.success) {
            return message.error('Ошибка получения кол-ва');
        }
        setFoodCount(response.data)
        return
    }



    useEffect(() => {
        const fetchFood = async () => {
            getFood();
            getFoodCount();
            getFoodByKitchen(1);
            getFoodByKitchen(2);
            getFoodByKitchen(3);
            getFoodByKitchen(4);
        };
        fetchFood();
    }, []);

    const getFoodCardByKitchen = (food, kitchen_name) => {
        return (food.map(foodElem => <>
                <Badge.Ribbon text={`${foodElem['price']} руб.`} color='blue' placement='end'>
                    <Card size='small' key={foodElem['food_id']} actions={[
                        <Button onClick={() =>{
                            setFoodInCart(oldArray => [...oldArray, foodElem]);
                            setCountCart(foodInCart.length+1);
                        }}>
                            Добавить
                        </Button>

                    ]}
                          cover={
                              <img
                                  alt="example"
                                  width={300}
                                  height={250}
                                  src={foodElem.file_fk
                                      ? `http://localhost:8000/api/v1/files/${foodElem.file_fk}`
                                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddZhgstwlbS72tVE48PuxqZwsglqpJdsj3A&usqp=CAU"}
                              />
                          }
                          style={{
                              width: 300,
                          }}>
                        <Meta
                            title={foodElem['food_name']}
                            description={
                                <>
                                    {foodElem['description']}
                                    <br/>
                                    <br/>

                                </>}
                        />
                    </Card>
                </Badge.Ribbon>
        </>))
    }

    const getCartItems = (foods) =>{
        return(foods.map(foodElem=>
                <>
                    <List>
                        <List.Item>
                                <Avatar size={64} src={foodElem.file_fk
                                    ? `http://localhost:8000/api/v1/files/${foodElem.file_fk}`
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddZhgstwlbS72tVE48PuxqZwsglqpJdsj3A&usqp=CAU"}
                                />
                                <Divider type='vertical'/>
                                <Col>
                                    <Row>
                                        {foodElem['food_name']}
                                    </Row>
                                    <Row>
                                        {foodElem['description']}
                                    </Row>
                                </Col>
                                <Divider type='vertical'/>
                                <Col>
                                    <Row>
                                        Цена
                                    </Row>
                                    <Row>
                                        {foodElem['price']}
                                    </Row>
                                </Col>

                        </List.Item>
                    </List>
                    <Divider type='horizontal'/>
                </>
            )
        )

    }

    return (
        <>
            {/*<Title level={1}>Каталог</Title>*/}
            {foodCount===0 || foodCount===null
                ?
                <>
                    <h2>ЕДЫ НЕТ!</h2>
                </>
                :
                food.length>0
                    ?
                    <>
                        <Row justify='center'>
                            <Col>
                                <Title level={3}>Хиты продаж</Title>
                                <p>
                                    В данном разделе приведены блюда, которые лучше всего продаются в нашем заведении
                                </p>
                                <Row justify='center'>
                                    {getFoodCardByKitchen([food[0]], 'Израиль')}
                                    {getFoodCardByKitchen([food[3]], 'Прибалтика')}
                                    {getFoodCardByKitchen([food[2]], 'Чувашия')}
                                    {getFoodCardByKitchen([food[6]], 'Сибирь')}
                                </Row>
                                <Divider/>
                                <Title level={3}>Израиль</Title>
                                <p>
                                    Данный раздел посвящен кухне "Земли Обетованной"
                                </p>
                                <Row justify='center'>
                                    {getFoodCardByKitchen(foodIsr, 'Израиль')}
                                </Row>
                                <Divider/>
                                <Title level={3}>Чувашия</Title>
                                <p>
                                    Данный раздел посвящен кухне такой далекой, но такой близкой кухни славной
                                    республики Чувашия
                                </p>
                                <Row justify='center'>
                                    {getFoodCardByKitchen(foodChuv, 'Чувашия')}
                                </Row>
                                <Divider/>
                                <Title level={3}>Сибирь</Title>
                                <p>
                                    Раздел кухни самой холодной из приведенных - Сибирь
                                </p>
                                <Row justify='center'>
                                    {getFoodCardByKitchen(foodSib, 'Сибирь')}
                                </Row>
                                <Divider/>
                                <Title level={3}>Прибалтика</Title>
                                <p>
                                    Кухня такого района, как Прибалтика, славящегося своими морепродуктами
                                </p>
                                <Row justify='center'>
                                    {getFoodCardByKitchen(foodPrib, 'Прибалтика')}
                                </Row>
                            </Col>
                            <Col>
                                <Button onClick={()=> {
                                    if(countCart<=0){
                                        message.error("Корзина пустая", 2)
                                    }
                                    else{
                                        setCartIsOpen(true);
                                    }
                                }}>
                                    <Badge count={countCart} showZero>
                                        <ShoppingCartOutlined style={{fontSize:'30px', paddingBottom:'3px'}}/>
                                    </Badge>
                                </Button>
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                        <Spin tip="Загрузка..."/>
                    </>
            }
            <Modal visible={cartIsOpen} footer={null}
                   onCancel={() => {
                       setCartIsOpen(false);
                   }}>
                {getCartItems(foodInCart)}
                <Button type='primary' onClick={()=>{
                    // message.success('Успешно оформлено')
                    setCartIsOpen(false);
                    setIsPlaceOrderOpen(true);
                }}>
                    Оформить
                </Button>
            </Modal>
            <Modal visible={isPlaceOrderOpen} footer={null}
                   onCancel={() => {
                       setIsPlaceOrderOpen(false);
                       setCartIsOpen(true);
                   }}
                   form={form}>
                <Form form={form}
                      onFinish={(values) => {
                          //Функция отправки
                          message.success("Успешно оформлено")
                          setIsPlaceOrderOpen(false);
                          setIsSuccessWindowOpen(true);
                          form.resetFields();
                      }}>
                    <Form.Item
                        label="email"
                        name="user_email"
                        rules={[
                            {
                                required: true,
                                message: 'Введите город',
                            }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="ФИО"
                        name="user_name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите город',
                            },
                            ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Телефон"
                        name="user_phone"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Адрес"
                        name="user_address"
                        rules={[
                            {
                                required: true,
                                message: 'Введите город',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{offset: 18, span: 16,}}
                    >
                        <Button type="primary" htmlType="submit">
                            Оформить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal visible={isSuccessWindowOpen}
                   onCancel={() => {
                       setFoodInCart([]);
                       setCountCart(0);
                       setIsSuccessWindowOpen(false);
                   }}
                   footer={null}
            >
                <div style={{fontSize:'50px'}}>
                    ЗАКАЗ УСПЕШНО ОФОРМЛЕН
                </div>
                <Button onClick={()=>{
                    setFoodInCart([]);
                    setCountCart(0);
                    setIsSuccessWindowOpen(false);
                }}>
                    OK
                </Button>
            </Modal>
        </>
    );
};

export default Food;
