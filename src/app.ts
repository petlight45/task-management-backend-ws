import express from "express";
import http from "http";
import container from "./infrastructure/container";
import {asValue} from "awilix";
import {clientSocketEventHandler} from "./application/socket/handler";
import createAppSocketServer from "./application/socket";


const logger = container.resolve('logger')

const app = express();
const server = http.createServer(app);
const io = createAppSocketServer(server, logger)

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
    `);
    clientSocketEventHandler(socket, notificationPort, authServicePort, logger);
});
// Resolving needed ports
const notificationPort = container.resolve('notificationPort');
const authServicePort = container.resolve('authServicePort');
const messageQueuePort = container.resolve('messageQueuePort');
const appConfig = container.resolve('appConfig');

// Set up RabbitMQ listener
messageQueuePort.connectAndConsume(appConfig.MESSAGE_QUEUE_NAME).catch((err) => logger.error(err as string | Error)).then((res) => logger.info("Successfully connected to message queue"))

server.listen(appConfig.SERVER_PORT, () => {
    logger.info(`Server running on port ${appConfig.SERVER_PORT}`);
});
