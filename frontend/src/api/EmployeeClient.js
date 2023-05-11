import Config from "./Config";
import { commonFetch, deleteFetch } from "../helpers/fetchers";

export default class EmployeeClient {
    constructor() {
        this.config = new Config();
    }

    async getEmplyees() {
        return await commonFetch(
            `${this.config.EMPLOYEE_URL}`,
            'GET',
            this.config.defaultHeaders(),
            null
        );
    }


    async getRestarauntCount() {
        return await commonFetch(
            `${this.config.RESTARAUNT_URL}/count`,
            'GET',
            this.config.defaultHeaders(),
            null
        )
    }


    async deleteRestaraunt(rest_id){
        return await deleteFetch(
            `${this.config.RESTARAUNT_URL}/${rest_id}`,
            'DELETE',
            this.config.defaultHeaders(),
            null
        )
    }

    async createRestaraunt(newRest) {
        return await commonFetch(
            `${this.config.RESTARAUNT_URL}/`,
            'POST',
            this.config.defaultHeaders(),
            JSON.stringify(newRest)
        );
    }

    async editRest(editedRest) {
        return await commonFetch(
            `${this.config.FOOD_URL}/${editedRest['rest_id']}`,
            'PUT',
            this.config.defaultHeaders(),
            JSON.stringify({"city": editedRest['city'], "street": editedRest['street'],
                "building": editedRest['building'], "number_of_seats": editedRest['number_of_seats'],
                "work_time": editedRest['work_time']})
        )
    }


}