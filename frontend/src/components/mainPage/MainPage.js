import {Pagination, Spin, Typography, Badge, message, Card, Col, Row, Button, Divider, Avatar, Image, Input, Form} from "antd";
import {useEffect, useState} from 'react';
import FoodClient from "../../api/FoodClient";
import FileClient from "../../api/FileClient";

const {Title} = Typography;
const { Meta } = Card;



const MainPage = () => {
    const [food, setFood] = useState([]);
    const [foodChuv, setFoodChuv] = useState([]);
    const [foodIsr, setFoodIsr] = useState([]);
    const [foodSib, setFoodSib] = useState([]);
    const [foodPrib, setFoodPrib] = useState([]);
    const [foodCount, setFoodCount] = useState([]);


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
            // getFoodByKitchen(1);
            // getFoodByKitchen(2);
            // getFoodByKitchen(3);
            // getFoodByKitchen(4);
        };
        fetchFood();
    }, []);

    const chooseKitchenById = (kitchen_id) =>{
        if (kitchen_id===1){
            return "Израиль"
        }
        if (kitchen_id===2){
            return "Чувашия"
        }
        if (kitchen_id===3){
            return "Сибирь"
        }
        if (kitchen_id===4){
            return "Прибалтика"
        }
    }

    const chooseKitchenPicture = (kitchen_id) =>{
        if (kitchen_id===0){
            return "https://cdnn21.img.ria.ru/images/152637/36/1526373614_0:160:3072:1888_1920x0_80_0_0_b13831557e82fcf9fc1786e6b7b31516.jpg"
        }
        if (kitchen_id===1){
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Tsjeboksary-golfen.jpg/1200px-Tsjeboksary-golfen.jpg"
        }
        if (kitchen_id===2){
            return "https://wikiway.com/upload/uf/581/siberia_94.jpg"
        }
        if (kitchen_id===3){
            return "data:image/jpeg;base64,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"
        }
    }

    const getKitchensCards = () => {
        let kitchens=['Израиль', 'Чувашия', 'Сибирь', 'Прибалтика']
        return (kitchens.map(kitchen => <>
            {/*<Badge.Ribbon text={chooseKitchenById(foodElem.kitchen_fk)} color='#F97B7B' placement='end'>*/}
                <Card size='small'
                      cover={
                          <img
                              alt="example"

                              height={250}
                              src={chooseKitchenPicture(kitchens.indexOf(kitchen))}
                          />
                      }
                      style={{
                          width: 300,
                      }}>
                    <Meta
                        title={kitchen}
                    />
                </Card>
            {/*</Badge.Ribbon>*/}
        </>))
    }

    const getFoodCardByKitchen = (food) => {
        return (food.map(foodElem => <>
            <Badge.Ribbon text={chooseKitchenById(foodElem.kitchen_fk)} color='#F97B7B' placement='end'>
            <Card size='small' key={foodElem['food_id']}
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
                    description={foodElem['description']}
                />
            </Card>
            </Badge.Ribbon>
        </>))
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
                                <Title level={3}>Кто мы?</Title>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                <br/>ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                <br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                <Title level={3}>Кухни мира</Title>
                                <Row justify='center'>
                                    {getKitchensCards()}
                                </Row>
                                <Divider/>
                                <Row >
                                <Form
                                        name="basic"
                                        labelCol={{
                                            span: 4,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        style={{
                                            width: 800,
                                        }}
                                        onFinish={(values) => {
                                            console.log('Success:', values);
                                        }}
                                    >

                                    <Form.Item
                                            label="Имя"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your name!',
                                                },
                                            ]}
                                        >
                                        <Input/>
                                    </Form.Item>
                                     <Form.Item
                                        label="email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                        ]}
                                     >
                                         <Input />
                                        </Form.Item>
                                    <Form.Item
                                        label="Телефон"
                                        name="phone"
                                        rules={[
                                            {
                                                message: 'Please input your phone!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Подписаться на рассылку
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Row>
                                <Divider/>
                                <Title level={3}>Наши блюда</Title>
                                <Row justify='center'>
                                    {getFoodCardByKitchen(food.slice(4))}
                                </Row>
                                <Divider/>

                                <Title level={3}>Мы на карте</Title>
                                <p>
                                    <Image height={350}
                                           width={600}
                                           src='https://sm.mashable.com/t/mashable_in/photo/default/maps_dmpu.1248.jpg'/>
                                </p>
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

export default MainPage;
