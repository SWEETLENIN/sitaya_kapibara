import {useEffect, useState} from "react";
import {message, Button, Upload, Divider} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import FileClient from "../../api/FileClient";

const Uploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileclient = new FileClient();

    const handleChange = (event) => {
        console.log(event.target.files);
        setSelectedFile(event.target.files[0])
    };

    const handleUpload = async  () => {
        if (!selectedFile){
            alert("Please select a file");
            return;
        };
        const formData = new FormData();
        formData.append('file', selectedFile);

        // const res = await fetch("http://10.248.131.31:8000/api/v1/files", {
        //     method: 'POST',
        //     body:formData
        // })
        const res = await fileclient.postFile(formData)
        if (!res.success) {
            const detail = res?.error?.detail;
            const errMsg = detail && typeof detail == 'string' ? detail : 'Ошибка загрузки файла!';
            message.error(errMsg);
        }
        message.success('Файл успешно загружен!');
        setSelectedFile(null);
    };


    const uploadProps = {
        onRemove: (file) => {
            setSelectedFile(null);
        },
        beforeUpload: (file) => {
            setSelectedFile(file);
            return false;
        }
    };

    return (
    <>
        <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Выбор файла</Button>
        </Upload>
        <Divider type='vertical'/>
        <Button
            type="primary"
            onClick={handleUpload}
            disabled={selectedFile == null}
        >
        Загрузить на сервер
        </Button>
    </>)
}


export default Uploader;
