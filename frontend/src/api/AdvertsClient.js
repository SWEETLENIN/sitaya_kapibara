import Config from "./Config";
import { commonFetch, deleteFetch } from "../helpers/fetchers";

export default class AdvertsClient {
    constructor() {
        this.config = new Config();
    }

    async getFirstPageAdverts() {
        return await commonFetch(
            `${this.config.ADVERTS_URL}`,
            'GET',
            this.config.defaultHeaders(),
            null
        );
    }

    async getAdvertsPages(pageNumber, size) {
        return await commonFetch(
            `${this.config.ADVERTS_URL}?page=${pageNumber}&size=${size}`,
            'GET',
            this.config.defaultHeaders(),
            null
        );
    }

    async getAdvertsCount() {
        return await commonFetch(
            `${this.config.ADVERTS_URL}/count`,
            'GET',
            this.config.defaultHeaders(),
            null
        )
    }

    async createAdvert(newAdvert) {
        return await commonFetch(
            this.config.ADVERTS_URL,
            'POST',
            this.config.headersWithAuthorization(),
            JSON.stringify(newAdvert)
        );
    }

    async delAdvert(advert_id) {
        return await deleteFetch(
            `${this.config.ADVERTS_URL}/${advert_id}`,
            'DELETE',
            this.config.headersWithAuthorization(),
            null
        );
    }
    async getFirstAdvertsForAuth(pageNumber) {
        return await commonFetch(
            `${this.config.ADVERTS_URL}/for_auth?page=${pageNumber}`,
            'GET',
            this.config.defaultHeaders(),
            null
        );
    }

    async editAdvert(editedAdvert) {
        return await commonFetch(
            `${this.config.ADVERTS_URL}/${editedAdvert['advert_id']}`,
            'PUT',
            this.config.headersWithAuthorization(),
            JSON.stringify({"menu_fk": editedAdvert['menu_fk'], "message": editedAdvert['message'], "advert_title": editedAdvert['advert_title'], "files": editedAdvert['files']})
        )
    }

    async sendMail(advert_id, user_ids, message){
        return await commonFetch(
            `${this.config.ADVERTS_URL}/${advert_id}/mail`,
            'POST',
            this.config.headersWithAuthorization(),
            JSON.stringify({"user_id": user_ids})
        );
    }

}