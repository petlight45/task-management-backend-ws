"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const notify_task_events_1 = require("../core/usecases/notify_task_events");
const config_1 = __importDefault(require("../config"));
const socket_notification_1 = require("../adapters/ws/socket_notification");
const auth_1 = require("../adapters/http/auth");
const rabbit_mq_1 = require("../adapters/message_queue/rabbit_mq");
config_1.default.initiate();
const container = (0, awilix_1.createContainer)();
exports.default = container.register({
    notifyTaskEvents: (0, awilix_1.asClass)(notify_task_events_1.NotifyTaskEvents).singleton(),
    notificationPort: (0, awilix_1.asClass)(socket_notification_1.SocketIoNotificationAdapter).singleton(),
    authServicePort: (0, awilix_1.asClass)(auth_1.AuthServiceAdapter).singleton(),
    messageQueuePort: (0, awilix_1.asClass)(rabbit_mq_1.RabbitMQAdapter).singleton(),
    appConfig: (0, awilix_1.asValue)(config_1.default),
    io: (0, awilix_1.asValue)(null) // Placeholder, will be set in server.ts,
});
