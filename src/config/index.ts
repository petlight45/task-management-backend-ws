import dotenv from "dotenv";
import path from "path";


// Environmental Variables

export default class AppConfig {
    static initiate() {
        dotenv.config({
            path: path.resolve(__dirname, `../../.env`)
        });
    }

    static get SECRET_KEY(): string {
        return process.env.EXPRESS_APP_SECRET_KEY as string
    }

    static get SERVER_PORT(): string {
        return process.env.EXPRESS_APP_SERVER_PORT as string || '3000'
    }

    static get HTTP_SERVER_PRIVATE_ENDPOINT_SECRET_KEY(): string{
        return process.env.EXPRESS_APP_HTTP_SERVER_PRIVATE_ENDPOINT_SECRET_KEY as string
    }

    static get HTTP_SERVER_BASE_URL(): string{
        return process.env.EXPRESS_APP_HTTP_SERVER_BASE_URL as string
    }

    static get RABBIT_MQ_URL(): string{
        return process.env.EXPRESS_APP_RABBIT_MQ_URL as string
    }

    static get MESSAGE_QUEUE_NAME(): string{
        return process.env.EXPRESS_APP_MESSAGE_QUEUE_NAME as string
    }



}