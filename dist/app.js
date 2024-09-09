"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const container_1 = __importDefault(require("./infrastructure/container"));
const awilix_1 = require("awilix");
const handler_1 = require("./application/socket/handler");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: true,
        credentials: true
    }
});
// Set the io instance in the DI container
container_1.default.register({
    io: (0, awilix_1.asValue)(io)
});
// Resolving needed ports
const notificationPort = container_1.default.resolve('notificationPort');
const authServicePort = container_1.default.resolve('authServicePort');
const messageQueuePort = container_1.default.resolve('messageQueuePort');
const appConfig = container_1.default.resolve('appConfig');
// Set up Socket.io connection handler
io.on("connection", (socket) => {
    console.log("New client connected");
    // Passing the socket io notification port and auth service to the event handler
    (0, handler_1.clientSocketEventHandler)(socket, notificationPort, authServicePort);
});
// Set up RabbitMQ listener
messageQueuePort.connectAndConsume(appConfig.MESSAGE_QUEUE_NAME).catch(console.error);
server.listen(appConfig.SERVER_PORT, () => {
    console.log(`Server running on port ${appConfig.SERVER_PORT}`);
});
