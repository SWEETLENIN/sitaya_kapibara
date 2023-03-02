import {createFileName} from "../../helpers/createFileNames";
import emulateFileDownload from "../../helpers/emulateFileDownload";
import {FileExcelTwoTone} from "@ant-design/icons";
import {Card, Badge, message} from "antd";
import getDate from "../../helpers/getDate";
import AdvertsClient from '../../api/AdvertsClient';
import FileClient from "../../api/FileClient";
import MenuClient from "../../api/MenuClient";

const fileClient = new FileClient();
const menuClient = new MenuClient();
export const advertsClient = new AdvertsClient();
export const statotch=21473;

export const getAdvertsForAuth = async (pageNumber) => {
    const response = await advertsClient.getFirstAdvertsForAuth(pageNumber);
    if (!response.success) {
        console.log(response.error);
        return [];
    }
    return response.data.map(advert => {
        advert['key'] = advert['advert_id'];
        return advert
    });
}


export const getAdvertsPage = async (pageNumber, size) => {
    const response = await advertsClient.getAdvertsPages(pageNumber, size);
    if (!response.success) {
        console.log(response.error);
        return [];
    }
    return response.data.map(advert => {
        advert['key'] = advert['advert_id'];
        return advert
    });
}
export const getAdvertsCount = async () => {
    const response = await advertsClient.getAdvertsCount();
    if (!response.success) {
        console.log(response.error);
        return 0;
    }
    return response.data['adverts_count'];
}

export const getAdvertFile = async (fileUUID) => {
    const res = await fileClient.getFile(fileUUID);
    console.log(res);
    if (!res.success) {
        console.log(res.error);
        return;
    }
    const fileNameWithExt = createFileName(res.headers);
    emulateFileDownload(fileNameWithExt, res.blob);
}



export const getFiles = (arrayoffiles) => {
    if (arrayoffiles.length>0){
        const listoffiles= arrayoffiles.map((number) => <><FileExcelTwoTone onClick={ async () => {
            await getAdvertFile(number['file_id'])
        }}/>
            {number['file_name']}{" "}</>);
        return listoffiles
    }
}


export const PickLabelForMenuName = (parent_id, menu_name, stat_otch_id) => {
    if (parent_id===null && menu_name===null) {
        return "ОБЩЕЕ";
    }
    if (parent_id !== null && parent_id === stat_otch_id) {
        return "Статистическая отчетность/ " + menu_name;
    }
    return menu_name;
}


export const getCards = (advs, statId) => {
    return (advs.map(advert => <>
        <Badge.Ribbon text={PickLabelForMenuName(advert['parent_id'], advert['menu_name'], statId)} color='grey' placement='start'>
            <Badge.Ribbon text={getDate(advert['create_date'])} color='red' placement='end'>
        <Card key={advert['advert_id']} title={<div className="titles-for-adverts">{advert['advert_title']}</div>}>
            <div className="text-for-adverts">{advert['message']}</div>
            <div className="files-for-adverts">{getFiles(advert['files'])}</div>
        </Card>
        </Badge.Ribbon>
        </Badge.Ribbon>
    </>))
}


export const getStatOtch = async () => {
    const res = await menuClient.getIdOfMenuItem("Статистическая отчетность");
    if (!res.success){
        console.log(res.error)
        message.error("Не удалось получить id для 'Cтат. отчетность'")
    }
    return res.data['menu_id']
}


