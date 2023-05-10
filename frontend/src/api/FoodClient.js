import Config from "./Config";
import { commonFetch, deleteFetch } from "../helpers/fetchers";

export default class FoodClient {
    constructor() {
        this.config = new Config();
    }

    async getAllFood() {
        return await commonFetch(
            `${this.config.FOOD_URL}`,
            'GET',
            this.config.defaultHeaders(),
            null
        );
    }

    async getFoodByKitchen(kitchen_id) {
        return await commonFetch(
            `${this.config.FOOD_URL}/by_kitchen/${kitchen_id}`,
            'GET',
            this.config.defaultHeaders(),
            null
        );
    }

    async getFoodCount() {
        return await commonFetch(
            `${this.config.FOOD_URL}/count`,
            'GET',
            this.config.defaultHeaders(),
            null
        )
    }

    async getFilePath(file_fk) {
        return await commonFetch(
            `${this.config.FOOD_URL}/for_food/${file_fk}`,
            'GET',
            this.config.defaultHeaders(),
            null
        )
    }

    async deleteFood(food_id){
        return await deleteFetch(
            `${this.config.FOOD_URL}/${food_id}`,
            'DELETE',
            this.config.defaultHeaders(),
            null
        )
    }

    async createFood(newFood) {
        return await commonFetch(
            `${this.config.FOOD_URL}/`,
            'POST',
            this.config.defaultHeaders(),
            JSON.stringify(newFood)
        );
    }

    async editFood(editedFood) {
        return await commonFetch(
            `${this.config.FOOD_URL}/${editedFood['food_id']}`,
            'PUT',
            this.config.defaultHeaders(),
            JSON.stringify({"food_name": editedFood['food_name'], "file_fk": editedFood['file_fk'],
                "description": editedFood['description'], "price": editedFood['price'], "kitchen_fk": editedFood['kitchen_fk']})
        )
    }

    //
    // async delAdvert(advert_id) {
    //     return await deleteFetch(
    //         `${this.config.ADVERTS_URL}/${advert_id}`,
    //         'DELETE',
    //         this.config.headersWithAuthorization(),
    //         null
    //     );
    // }
    // async getFirstAdvertsForAuth(pageNumber) {
    //     return await commonFetch(
    //         `${this.config.ADVERTS_URL}/for_auth?page=${pageNumber}`,
    //         'GET',
    //         this.config.defaultHeaders(),
    //         null
    //     );
    // }
    //

    //
    // async sendMail(advert_id, user_ids, message){
    //     return await commonFetch(
    //         `${this.config.ADVERTS_URL}/${advert_id}/mail`,
    //         'POST',
    //         this.config.headersWithAuthorization(),
    //         JSON.stringify({"user_id": user_ids})
    //     );
    // }

}