import Config from "./Config";
import { commonFetch, docFetch } from "../helpers/fetchers";

export default class FileClient {
    constructor() {
        this.config = new Config();
    }

    async getFile(uuid) {
        return await docFetch(
            `${this.config.FILE_URL}/${uuid}`,
            'GET',
            this.config.headersOnlyAuthorization(),
            null);
    }

    async postFile(body) {
        return await commonFetch(
            `${this.config.FILE_URL}`,
            'POST',
            this.config.defaultHeaders(),
            body);
    }
    async postFiles(body) {
        return await commonFetch(
            `${this.config.FILE_URL}/several`,
            'POST',
            this.config.headersOnlyAuthorization(),
            body);
    }

    async getFilesWithoutLink() {
      return await commonFetch(
          `${this.config.FILE_URL}/without_link`,
          'GET',
          this.config.defaultHeaders(),
          null);
    }

    async getFileInfoByID(uuid){
        return await commonFetch(
            `${this.config.FILE_URL}/${uuid}/short`,
            'GET',
            this.config.defaultHeaders(),
            null
        )
    }
}
