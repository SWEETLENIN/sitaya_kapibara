import {Pagination, Spin, Typography, Badge, message, Card, Col,
    Row, Button, Divider, Avatar, Image, Popconfirm, Form, Modal, Table} from "antd";
import {useEffect, useState} from 'react';
import RestarauntClient from "../../api/RestarauntClient";
import FileClient from "../../api/FileClient";
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {objectTrimmer} from "../../helpers/objectTrimmer";
import RestForm from "./form/RestForm";
import timeStrToMoment from "../../helpers/timeStrToMoment";


const {Title, Link} = Typography;
const { Meta } = Card;



const RestarauntAdmin = () => {
    const [restaraunt, setRestaraunt] = useState([]);
    const [restarauntCount, setRestarauntCount] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [restarauntForEdit, setRestarauntForEdit] = useState({});
    const [form] = Form.useForm();

    const restarauntClient=new RestarauntClient();


    const getRestaraunt = async () =>{
        const response= await restarauntClient.getRestaraunt()
        if (!response.success) {
            return message.error('Ошибка получения');
        }
        setRestaraunt(response.data)
        return
    }

    const getRestarauntCount = async () =>{
        const response= await restarauntClient.getRestarauntCount()
        if (!response.success) {
            return message.error('Ошибка получения кол-ва');
        }
        setRestarauntCount(response.data)
        return
    }

    const deleteRestarauntById = async (rest_id) =>{
        const response = await restarauntClient.deleteRestaraunt(rest_id)
        if (!response.success) {
            message.error("Ошибка удаления!")
            return;
        }
        message.success("Успешно удалено")
        const newData = restaraunt.filter((item) => item['rest_id'] !== rest_id);
        setRestaraunt(newData);
    }

    const addNewRestaraunt = async (newRest) => {
        newRest=objectTrimmer(newRest)
        const response = await restarauntClient.createRestaraunt(newRest);
        if (!response.success) {
            message.error( "Ошибка добавления!")
            return;
        }
        message.success("Успешно добавлено")
        let newREST = response.data;
        newREST['key'] = newREST['rest_id'];
        setRestaraunt(origin => [newREST,...origin])
        setIsAddModalOpen(false);
        form.resetFields()
    }

    const prepareRestForEdit = (restItem) =>{
        let time=restItem['work_time'].split("-")
        let time1=timeStrToMoment(time[0])
        let time2=timeStrToMoment(time[1])
        restItem['work_time']=[time1, time2]
        setRestarauntForEdit(restItem);
        form.setFieldsValue({...restItem});
    }

    const editRest = async (values) => {
        values=objectTrimmer(values)
        const response = await restarauntClient.editRest(values);
        if (!response.success) {
            message.error("Ошибка редактирования!")
            return;
        }
        message.success("Успешно изменено")
        setRestaraunt(origin => origin.map(item => {
            if (item['rest_id'] === values['rest_id']) {
                return {...item, ...values};
            }
            return item;
        }));
        setRestarauntForEdit({});
        form.resetFields()
    }


    useEffect(() => {
        const fetchRest = async () => {
            getRestaraunt();
            getRestarauntCount();
        };
        fetchRest();
    }, []);

    const tableColumns = [
        {
            title: 'ID',
            dataIndex: 'rest_id',
            key: 'rest_id'
        },
        {
            title: 'Город',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Улица',
            dataIndex: 'street',
            key: 'street',
        },
        {
            title: 'Дом',
            dataIndex: 'building',
            key: 'building',
        },
        {
            title: 'Кол-во мест',
            dataIndex: 'number_of_seats',
            key: 'number_of_seats',
        },
        {
            title: 'Рабочее время',
            dataIndex: 'work_time',
            key: 'work_time',
        },
        {
            title: '',
            dataIndex: 'operation',
            ker: 'operation',
            render: (_, record) =>
                // restarauntCount > 0 ? (
                    <>
                        <Divider type="vertical"/>
                        <Button type='link' onClick={()=> {
                            prepareRestForEdit(record);
                        }}>
                            <EditTwoTone style={{ fontSize: '20px', paddingTop: '1px'}}/>
                        </Button>
                        <Divider type="vertical"/>
                        <Popconfirm title={`Вы точно хотите удалить ресторан по адресу:
                         ${record['city']}, ${record['street']} ${record['building']}?`} onConfirm={() => {
                            deleteRestarauntById(record['rest_id'])
                        }}>
                            <DeleteTwoTone style={{ fontSize: '20px', paddingTop: '5px'}} twoToneColor='#FF0000'/>
                        </Popconfirm>
                    </>
                // ) : null,
        }
    ];


    return (
        <>
            <Divider type='horizontal'><Title level={2}>Корректировка ресторанов</Title></Divider>
            <Button type='default' onClick={() => {
                setIsAddModalOpen(true);
            }}>
                Добавить новый ресторан
            </Button>
            <Divider type='horizontal'/>
            {restarauntCount===0 || restarauntCount===null
                ?
                <>
                    <h2>РЕСТОРАНОВ НЕТ!</h2>
                </>
                :
                restaraunt.length>0
                    ?
                    <>
                        <Row justify='center'>
                            <Table columns={tableColumns} dataSource={restaraunt}
                                   pagination={true} id="rest-table"
                            />
                        </Row>
                    </>
                    :
                    <>
                        <Spin tip="Загрузка..."/>
                    </>
            }
            <Modal visible={Object.keys(restarauntForEdit).length !== 0 || isAddModalOpen} footer={null}
                   onCancel={() => {
                       if (Object.keys(restarauntForEdit).length !== 0){
                           setRestarauntForEdit({});
                       }
                       else{
                           setIsAddModalOpen(false);
                       }
                       form.resetFields();
                   }}
                   form={form}
                   maskClosable={false}>
                <RestForm edit={editRest} add={addNewRestaraunt} form={form} restForEdit={restarauntForEdit}
                          modalCond={isAddModalOpen}/>
            </Modal>
        </>
    );
};

export default RestarauntAdmin;
