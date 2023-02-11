import {
    Card,
    Pagination,
    Spin,
    Typography,
    Popconfirm,
    Button,
    Col,
    Row,
    Form,
    Input,
    Modal,
    Select,
    Upload,
    message,
    Badge,
    Tooltip
} from "antd";
import {useEffect, useState} from 'react';
import {DeleteTwoTone, EditTwoTone, MailTwoTone, PushpinTwoTone, PlusOutlined } from '@ant-design/icons';
import {getAdvertsPage, getAdvertsCount, advertsClient, getFiles, getStatOtch, PickLabelForMenuName} from "./AdvertsFunctions";
import getDate from "../../helpers/getDate";
import FileClient from "../../api/FileClient";
import MenuClient from "../../api/MenuClient";
import MailingListClient from "../../api/MailingListClient";

import Uploader from "../uploader/uploader";


const {Title} = Typography;





const AdvertsAdmin = () => {
    const [adverts, setAdverts] = useState([]);
    const [advertsCount, setAdvertsCount] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [AdvertForEdit, setAdvertForEdit] = useState({});
    const [treeData, setTreeData] = useState([]);
    const [filesWithoutLink, setFilesWithoutLink] = useState([]);
    const [advertsFilesDef, setAdvertFilesDef] = useState([]);
    const [mailinglist, setMailinglist] = useState([]);
    const [statOtchId, setStatOtchID] = useState(0)
    const [formEdit] = Form.useForm();

    const mailinglistClient = new MailingListClient();
    const fileClient = new FileClient();
    const menuClient = new MenuClient();
    let mails = [];



    const getMails = async () => {
        const res = await mailinglistClient.getallmails();
        if (!res.success){
            console.log(res.error)
        }
        setMailinglist(res.data)
    }
    const handleDelete = async (key) => {
        const res = await advertsClient.delAdvert(key);
        if (!res.success) {
            console.log(res.error)
        }
        const newData = adverts.filter((item) => item['advert_id'] !== key);
        setAdverts(newData);
    };

    const addNewAdvert = async (newAdvert) => {
        const response = await advertsClient.createAdvert(newAdvert);

        if (!response.success) {
            console.log(response.error)
        }

        let newADVERT = response.data;
        newADVERT['key'] = newADVERT['advert_id'];

        setAdverts(origin => [newADVERT,...origin])
    }

    const editAdvert = async (values) => {
        if (values['files'].length===0 || values['files'][0]['value']===undefined){
            const response = await advertsClient.editAdvert(values);}
        else{
            const file_ids=[]
            const file_names=[]
            for (const element of values['files']){
                file_ids.push(element['value'])
                file_names.push(element['value'])
            }
            values['files']=file_ids
            const response = await advertsClient.editAdvert(values)
        }
        const response = await advertsClient.editAdvert(values);
        if (!response.success) {
            console.log(response.error)
        }
        setAdverts(origin => origin.map(item => {
            if (item['advert_id'] === values['advert_id']) {
                const menu_item = treeData.find(item => (item.menu_id == values['menu_fk']) );
                if (!menu_item) return {...item, ...values, 'menu_name': null};
                return {...item, ...values, 'menu_name': menu_item.menu_name};
            }
            return item;
        }));
    }

    const onPaginationChange = async (page) => {
        const adverts = await getAdvertsPage(page - 1, 10);
        setAdverts(adverts);
    }

    const SendMail = async (advert_id, user_ids, message) => {
        const response = await advertsClient.sendMail(advert_id, user_ids, message)
        if (!response.success) {
            console.log(response.error)
        }
    }




    const getCardsForAuth = (advs) => {
        return (advs.map(advert => <>
                <Badge.Ribbon text={PickLabelForMenuName(advert['parent_id'], advert['menu_name'], statOtchId)} color='grey' placement='start'>
                <Badge.Ribbon text={getDate(advert['create_date'])} color='red' placement='end'>
                <Card key={advert['advert_id']} title={<div className="titles-for-adverts">{advert['advert_title']}</div>}
                      actions={[
                      <Tooltip placement="bottom" title='Редактировать объявление'>
                          <Button type="link" onClick={() => {
                              setAdvertForEdit(advert);
                              formEdit.setFieldsValue({...advert, ['files']: advert['files'].length> 0 ? advert['files'].map((item) => {return {value: item['file_id'], label: `${item['file_name']} (${item['file_id']})`}})
                                      : []});
                          }}><EditTwoTone style={{ fontSize: '20px'}}/></Button>
                      </Tooltip>,
                      <Tooltip placement="bottom" title='Удалить объявление'>
                          <Popconfirm title={`Вы точно хотите удалить ${advert['advert_title']}?`} onConfirm={() => {
                              handleDelete(advert['advert_id'])
                          }}>
                              <DeleteTwoTone style={{ fontSize: '20px'}} twoToneColor='#FF0000'/>
                          </Popconfirm>
                      </Tooltip>,
                      <Tooltip placement="bottom" title='Сделать рассылку объявления'>
                          <Popconfirm title={<>{`Разослать ${advert['advert_title']}?`}
                              {/*<br/>*/}
                              {/*<Input.TextArea allowClear='True' placeholder='Введите сообщение для рассылки' defaultValue={advert['message']}/>*/}
                              {/*<br/>*/}
                              <br/>
                              <Select
                                  showSearch
                                  placeholder="Введите email для поиска"
                                  optionFilterProp="children"
                                  allowClear='True'
                                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                  filterSort={(optionA, optionB) =>
                                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                  }
                                  dropdownStyle={{'padding-top': 70 ,
                                      'padding-bottom': 70,}}
                                  style={{
                                      width: 360,
                                  }}
                                  options={mailinglist.length > 0
                                      ? mailinglist.map(item =>
                                      {return {'value': item['mail_id'], 'label': `${item['email']} (${item['name']})`}})
                                      : []
                                  }
                                  mode='multiple'
                                  onSelect={(input, option) => {
                                      mails.push(input)
                                  }}
                                  onDeselect={(input, option) => {
                                      var index = mails.indexOf(input);
                                      if (index > -1) {
                                          mails.splice(index, 1);
                                      }
                                  }}
                              />
                          </>
                          } onConfirm={() => {
                              // console.log(mails);
                              SendMail(advert['advert_id'], mails);
                              mails=[];
                          }}>
                              <MailTwoTone style={{ fontSize: '20px'}}/>
                          </Popconfirm>
                      </Tooltip>]} >
                    <div className="text-for-adverts">{advert['message']}</div>
                    <div className="files-for-adverts">{getFiles(advert['files'])}</div>
            </Card>
            </Badge.Ribbon>
            </Badge.Ribbon>

        </>))
    }

    const getMenuChildren = async (key) => {
        const res = await menuClient.getMenuChildren(key);
        if (!res.success) {
            console.log(res.error);
            return [];
        }
        return res.data;
    }

    const getFilesWithoutLink = async () => {
        const res = await fileClient.getFilesWithoutLink();
        if (!res.success) {
            const detail =  res?.error.detail;
            const errMsg = detail && typeof detail === "string" ? detail : "Ошибка получения информации!";
            return message.error(errMsg, 5);
        }
        setFilesWithoutLink(res.data);

    }




    useEffect(() => {
        const fetchAdverts = async () => {
            let statId = await getStatOtch();
            setStatOtchID(statId)
            const advert = await getAdvertsPage(0, 10);
            setAdverts(advert);
            const adverts_count = await getAdvertsCount();
            setAdvertsCount(adverts_count);
            const picklers = await getMenuChildren(0); // 0 - верхний уровень
            const picklers_for_statotch= await getMenuChildren(statId);
            const allpicklers=picklers.concat(picklers_for_statotch);
            setTreeData(allpicklers);
            getFilesWithoutLink();
            getMails();
        };
        fetchAdverts();
    }, []);





    return (
        <>
            <Row justify='center'>
            <Col span={8}>
            <Title level={3}>ОБЪЯВЛЕНИЯ</Title>
            </Col>
            <Col span={2}>
                <Button type='default' onClick={() => setIsAddModalOpen(true)}>
                    Добавить
                </Button>
            </Col>
            </Row>

            {advertsCount === 0 || advertsCount===null
                ?
                <>
                    <h2>ОБЪЯВЛЕНИЙ НЕТ!</h2>
                </>
                :
                adverts.length>0
                    ?
                    <>
                        <Row justify='center'>
                            <Col offset={1} span={14}>
                                <div className="AdvertsAdmin">
                                    {getCardsForAuth(adverts)}
                                </div>
                                <Pagination  showSizeChanger={false} total={advertsCount}
                                            onChange={(page) => onPaginationChange(page)}
                                />
                            </Col>
                            <Col offset={1}>
                                <Title level={5}>Загрузка файлов для объявлений</Title>
                                <Uploader/>
                            </Col>
                        </Row>
                    </>
                    :
                    <>
                        <Spin tip="Загрузка..."/>
                    </>
            }


            <Modal visible={Object.keys(AdvertForEdit).length !== 0} footer={null}
                   onCancel={() => {
                       formEdit.resetFields();
                       setAdvertForEdit({});
                   }}
            form={formEdit}>

                <div style={{marginTop: "20px"}}>
                    <Form
                        name="edit_advert"
                        onFinish={(values) => {
                            editAdvert(values);
                            setAdvertForEdit({});
                            formEdit.resetFields();
                        }}
                        form={formEdit}
                    >
                        <Form.Item
                            label="Сообщение:"
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите сообщение',
                                }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Заголовок:"
                            name="advert_title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите заголовок',
                                }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Раздел меню:"
                            name="menu_fk"
                            rules={[
                                {
                                    required: false,
                                }]}>
                            <Select
                                allowClear="true"
                                showSearch
                                style={{
                                    width: 360,
                                }}
                                placeholder="Введите запрос для поиска"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={(treeData || []).map((d) =>
                                    {   return d['parent_id']===null ?(
                                            ({
                                                value: d['menu_id'],
                                                label: d['menu_name'],
                                            })):
                                        (({
                                            value: d['menu_id'],
                                            label: "Статистическая отчетность/"+d['menu_name'],
                                        }))
                                    }
                                )}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Файлы: "
                            name="files"
                            rules={[
                                {
                                    required: false,
                                }]}
                        >
                            <Select
                                options={filesWithoutLink.length > 0
                                    ? filesWithoutLink.map(item =>
                                    {return {'value': item['file_id'], 'label': `${item['file_name']} (${item['file_id']})`}})
                                    : []
                                }
                                mode='multiple'
                            />
                        </Form.Item>
                        <Form.Item
                            name="advert_id"
                            hidden={true}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{offset: 18, span: 16, }}
                        >
                            <Button type="primary" htmlType="submit">
                                Изменить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>



            <Modal visible={isAddModalOpen} footer={null}
                   onCancel={() => {
                       formEdit.resetFields();
                       setIsAddModalOpen(false);
                   }}
            >
                <div style={{marginTop: "20px"}}>
                    <Form
                        name="add_advert"
                        onFinish={(values) => {
                            addNewAdvert(values);
                            setIsAddModalOpen(false);
                            formEdit.resetFields();
                        }}
                        form={formEdit}>
                        <Form.Item
                            label="Сообщение:"
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите сообщение',
                                },
                            ]}
                        >
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item
                            label="Заголовок:"
                            name="advert_title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите заголовок',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Раздел меню:"
                            name="menu_fk"
                            rules={[
                                {
                                    required: false,
                                }]}>
                            <Select
                                allowClear="true"
                                showSearch
                                style={{
                                    width: 360,
                                }}
                                placeholder="Введите запрос для поиска"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={(treeData || []).map((d) =>
                                {   return d['parent_id']===null ?(
                                    ({
                                    value: d['menu_id'],
                                    label: d['menu_name'],
                                    })):
                                    (({
                                        value: d['menu_id'],
                                        label: "Статистическая отчетность/"+d['menu_name'],
                                    }))
                                }
                                )}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Файлы: "
                            name="files"
                            rules={[
                                {
                                    required: false,
                                }]}
                        >
                            <Select
                                options={filesWithoutLink.length > 0
                                    ? filesWithoutLink.map(item =>
                                    {return {'value': item['file_id'], 'label': `${item['file_name']} (${item['file_id']})`}})
                                    : []
                                }
                                mode="multiple"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{offset: 18, span: 16, }}
                        >
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default AdvertsAdmin;
