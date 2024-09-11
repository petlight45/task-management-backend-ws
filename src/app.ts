import express from "express";
import http from "http";
import container from "./infrastructure/container";
import {asValue} from "awilix";
import {clientSocketEventHandler} from "./application/socket/handler";
import createAppSocketServer from "./application/socket";


export const logger = container.resolve('logger')

const app = express();
const server = http.createServer(app);
const io = createAppSocketServer(server)

// Set the io instance in the DI container

container.register({
    io: asValue(io)
});

// Set up Socket.io connection handler
io.on("connection", (socket) => {
    const clientIp = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
    logger.info(`New client connected:
        ID: ${socket.id}
        IP Address: ${clientIp}
        Handshake: ${JSON.stringify(socket.handshake)} 
    `);
    const notificationPort = container.resolve('notificationPort');
    const authServicePort = container.resolve('authServicePort');
    clientSocketEventHandler(socket, notificationPort, authServicePort, logger);
});

const appConfig = container.resolve('appConfig');
export const serverPort = appConfig.SERVER_PORT
// Set up RabbitMQ listener

export const startApp = async (): Promise<void> => {
    const messageQueuePort = container.resolve('messageQueuePort');
    await messageQueuePort.connectAndConsume(appConfig.MESSAGE_QUEUE_NAME).catch((err) => logger.error(err as string | Error)).then((res) => logger.info("Successfully connected to message queue"))
};
export default server;
