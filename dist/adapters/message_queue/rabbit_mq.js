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
exports.RabbitMQAdapter = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const task_1 = __importDefault(require("../../core/entities/task"));
class RabbitMQAdapter {
    constructor(params) {
        this.notifyTaskEvents = params.notifyTaskEvents;
        this.appConfig = params.appConfig;
        this.channel = null;
    }
    connectAndConsume(queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqplib_1.default.connect(this.appConfig.RABBIT_MQ_URL);
            const channel = yield connection.createChannel();
            yield channel.assertQueue(queueName);
            this.channel = channel;
            channel.consume(queueName, (msg) => {
                if (msg !== null) {
                    const task = JSON.parse(msg.content.toString());
                    this.routeMessage(task);
                    channel.ack(msg);
                }
            });
        });
    }
    routeMessage(task) {
        switch (task.eventType) {
            case "ON_TASK_CREATED":
                this.notifyTaskEvents.notifyTaskCreated(new task_1.default(task.payload));
                break;
            case "ON_TASK_DELETED":
                this.notifyTaskEvents.notifyTaskDeleted(new task_1.default(task.payload));
                break;
            case "ON_TASK_UPDATED":
                this.notifyTaskEvents.notifyTaskUpdated(new task_1.default(task.payload));
                break;
            case "ON_TASK_STATE_CHANGED":
                this.notifyTaskEvents.notifyTaskStateChanged(new task_1.default(task.payload));
                break;
            default:
                break;
        }
    }
}
exports.RabbitMQAdapter = RabbitMQAdapter;
