import {Pagination, Spin, Typography, Badge, message, Card, Col,
    Row, Button, Divider, Avatar, Image, Popconfirm, Form, Modal} from "antd";
import {useEffect, useState} from 'react';
import FoodClient from "../../api/FoodClient";
import FileClient from "../../api/FileClient";
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {objectTrimmer} from "../../helpers/objectTrimmer";
import FoodForm from "./form/FoodForm";

const {Title} = Typography;
const { Meta } = Card;




const FoodAdmin = () => {
    const [food, setFood] = useState([]);
    const [foodCount, setFoodCount] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [foodForEdit, setFoodForEdit] = useState({});
    const [form] = Form.useForm();

    const foodClient=new FoodClient();


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

    const deleteFoodById = async (food_id) =>{
        const response = await foodClient.deleteFood(food_id)
        if (!response.success) {
            message.error("Ошибка удаления!")
            return;
        }
        message.success("Успешно удалено")
        const newData = food.filter((item) => item['food_id'] !== food_id);
        setFood(newData);
    }

    const addNewFood = async (newFood) => {
        newFood=objectTrimmer(newFood)
        const response = await foodClient.createFood(newFood);
        if (!response.success) {
            message.error( "Ошибка добавления!")
            return;
        }
        message.success("Успешно добавлено")
        let newFOOD = response.data;
        newFOOD['key'] = newFOOD['food_id'];
        setFood(origin => [newFOOD,...origin])
        setIsAddModalOpen(false);
        form.resetFields()
    }

    const editFood = async (values) => {
        values=objectTrimmer(values)
        const response = await foodClient.editFood(values);
        if (!response.success) {
            message.error("Ошибка редактирования!")
            return;
        }
        message.success("Успешно изменено")
        setFood(origin => origin.map(item => {
            if (item['food_id'] === values['food_id']) {
                return {...item, ...values};
            }
            return item;
        }));
        setFoodForEdit({});
        form.resetFields()
    }


    useEffect(() => {
        const fetchFood = async () => {
            getFood();
            getFoodCount();
        };
        fetchFood();
    }, []);

    const getFoodCardByKitchen = (food) => {
        return (food.map(foodElem => <>
            {/*<Badge.Ribbon text={kitchen_name} color='red' placement='end'>*/}
            <Card size='small' key={foodElem['food_id']} actions={[
                <Popconfirm title={`Вы точно хотите удалить ${foodElem['food_name']}?`} onConfirm={() => {
                    deleteFoodById(foodElem['food_id'])
                }}>
                    <DeleteTwoTone style={{ fontSize: '20px', paddingTop: '5px'}} twoToneColor='#FF0000'/>
                </Popconfirm>,
                <Button type='link' onClick={()=> {
                    setFoodForEdit(foodElem);
                    form.setFieldsValue({...foodElem});
                }}>
                    <EditTwoTone style={{ fontSize: '20px', paddingTop: '1px'}}/>
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
                    description={foodElem['description']}
                />
            </Card>
            {/*</Badge.Ribbon>*/}
        </>))
    }

    return (
        <>
            <Divider type='horizontal'><Title level={2}>Корректировка блюд</Title></Divider>
            <Button type='default' onClick={() => {
                setIsAddModalOpen(true);
            }}>
                Добавить новое блюдо
            </Button>
            <Divider type='horizontal'/>
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
                            {getFoodCardByKitchen(food)}
                        </Row>
                    </>
                    :
                    <>
                        <Spin tip="Загрузка..."/>
                    </>
            }
            <Modal visible={Object.keys(foodForEdit).length !== 0 || isAddModalOpen} footer={null}
                   onCancel={() => {
                       if (Object.keys(foodForEdit).length !== 0){
                           setFoodForEdit({});
                       }
                       else{
                           setIsAddModalOpen(false);
                       }
                       form.resetFields();
                   }}
                   form={form}
                   maskClosable={false}>
                <FoodForm edit={editFood} add={addNewFood} form={form} foodForEdit={foodForEdit}
                          modalCond={isAddModalOpen}/>
            </Modal>
        </>
    );
};

export default FoodAdmin;
