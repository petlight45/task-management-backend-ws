"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
class AuthServiceAdapter {
    constructor(params) {
        this.appConfig = params.appConfig;
    }
    get endpoint_url() {
        return `${this.appConfig.HTTP_SERVER_BASE_URL}/user/private/token/access/profile`;
    }
    authenticate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(this.endpoint_url, {
                "access_token": token
            }, {
                headers: {
                    "secret-key": this.appConfig.HTTP_SERVER_PRIVATE_ENDPOINT_SECRET_KEY,
                }
            });
            return response.data;
        });
    }
}
exports.AuthServiceAdapter = AuthServiceAdapter;
