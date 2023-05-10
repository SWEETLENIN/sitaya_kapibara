import {Form, Input, Select, Button , InputNumber} from "antd";



const FoodForm = ({edit, add, form, foodForEdit, modalCond}) => {

    return(
        <div style={{marginTop: "20px"}}>
            <Form
                onFinish={(values) => {
                    if (Object.keys(foodForEdit).length !== 0){
                        edit(values);
                    }
                    else{
                        add(values);
                    }
                }}
                form={form}
            >
                <Form.Item
                    name="food_id"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Название блюда:"
                    name="food_name"
                    rules={[
                        {
                            required: true,
                            message: 'Введите название',
                        },
                        {
                            max:30
                        }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="File fk:"
                    name="file_fk"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Описание блюда:"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Введите описание',
                        },
                        {
                            max:200
                        }]}
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    label="Цена блюда:"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите цену',
                        }]}
                >
                    <InputNumber min={1} step="0.5"/>
                </Form.Item>
                <Form.Item
                    label="Кухня:"
                    name="kitchen_fk"
                >
                    <Select options={[
                        {value: 1, label: "Израиль"},
                        {value: 2, label: "Чувашия"},
                        {value: 3, label: "Сибирь"},
                        {value: 3, label: "Прибалтика"}]}/>
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

export default FoodForm