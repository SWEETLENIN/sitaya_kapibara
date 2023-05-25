import Config from "./Config";
import { commonFetch, deleteFetch } from "../helpers/fetchers";

export default class OrderClient {
    constructor() {
        this.config = new Config();
    }

    async sendEmailToUser(user_info) {
        return await commonFetch(
            `${this.config.ORDER_URL}/`,
            'POST',
            this.config.defaultHeaders(),
            JSON.stringify(user_info)
        );
    }
}