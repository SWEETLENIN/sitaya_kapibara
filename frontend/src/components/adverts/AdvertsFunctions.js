import {createFileName} from "../../helpers/createFileNames";
import emulateFileDownload from "../../helpers/emulateFileDownload";
import {FileExcelTwoTone} from "@ant-design/icons";
import {Card, Badge, message} from "antd";
import getDate from "../../helpers/getDate";
import AdvertsClient from '../../api/AdvertsClient';

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


export const getCards = (advs, statId) => {
    return <></>
}
