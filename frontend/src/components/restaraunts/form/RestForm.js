import {Form, Input, Select, Button, InputNumber, TimePicker} from "antd";
import timeMomentToStr from "../../../helpers/timeMomentToStr";



const RestForm = ({edit, add, form, restForEdit, modalCond}) => {

    return(
        <div style={{marginTop: "20px"}}>
            <Form
                onFinish={(values) => {

                    let time1=timeMomentToStr(values['work_time'][0])
                    let time2=timeMomentToStr(values['work_time'][1])
                    values['work_time']=time1+"-"+time2
                    if (Object.keys(restForEdit).length !== 0){
                        edit(values);
                    }
                    else{
                        add(values);
                    }
                }}
                form={form}
            >
                <Form.Item
                    name="rest_id"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Город:"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: 'Введите город',
                        },
                        {
                            max:30,
                            message: 'длина не более 30'
                        }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Улица:"
                    name="street"
                    rules={[
                        {
                            required: true,
                            message: 'Введите улицу',
                        },
                        {
                            max: 30,
                            message: 'Не более 30',
                        }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Дом:"
                    name="building"
                    rules={[
                        {
                            required: true,
                            message: 'Введите дом',
                        },
                        {
                            max:5,
                            message: 'Значение не более 5 символов(пример: 221B)'
                        }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Кол-во мест:"
                    name="number_of_seats"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите кол-во мест',
                        }]}
                >
                    <InputNumber min={1} step="10"/>
                </Form.Item>
                <Form.Item
                    label="Рабочее время:"
                    name="work_time"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите рабочие часы',
                        }]}
                >
                    <TimePicker.RangePicker/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{offset: 18, span: 16,}}
                >
                    <Button type="primary" htmlType="submit">
                        {modalCond ? <>Добавить</> : <>Изменить</>}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RestForm