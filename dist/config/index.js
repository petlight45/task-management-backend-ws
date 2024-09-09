"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Environmental Variables
class AppConfig {
    static initiate() {
        dotenv_1.default.config({
            path: path_1.default.resolve(__dirname, `../../.env`)
        });
    }
    static get SECRET_KEY() {
        return process.env.EXPRESS_APP_SECRET_KEY;
    }
    static get SERVER_PORT() {
        return process.env.EXPRESS_APP_SERVER_PORT || '3000';
    }
    static get HTTP_SERVER_PRIVATE_ENDPOINT_SECRET_KEY() {
        return process.env.EXPRESS_APP_HTTP_SERVER_PRIVATE_ENDPOINT_SECRET_KEY;
    }
    static get HTTP_SERVER_BASE_URL() {
        return process.env.EXPRESS_APP_HTTP_SERVER_BASE_URL;
    }
    static get RABBIT_MQ_URL() {
        return process.env.EXPRESS_APP_RABBIT_MQ_URL;
    }
    static get MESSAGE_QUEUE_NAME() {
        return process.env.EXPRESS_APP_MESSAGE_QUEUE_NAME;
    }
}
exports.default = AppConfig;
