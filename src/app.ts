import express from "express";
import http from "http";
import {Server as SocketIOServer} from "socket.io";
import container from "./infrastructure/container";
import {asValue} from "awilix";
import {clientSocketEventHandler} from "./application/socket/handler";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: true,
        credentials: true
    }
});

// Set the io instance in the DI container
container.register({
    io: asValue(io)
});

// Resolving needed ports
const notificationPort = container.resolve('notificationPort');
const authServicePort = container.resolve('authServicePort');
const messageQueuePort = container.resolve('messageQueuePort');
const appConfig = container.resolve('appConfig');


// Set up Socket.io connection handler
io.on("connection", (socket) => {
    console.log("New client connected");
    // Passing the socket io notification port and auth service to the event handler
    clientSocketEventHandler(socket, notificationPort, authServicePort);
});

// Set up RabbitMQ listener
messageQueuePort.connectAndConsume(appConfig.MESSAGE_QUEUE_NAME).catch(console.error);

server.listen(appConfig.SERVER_PORT, () => {
    console.log(`Server running on port ${appConfig.SERVER_PORT}`);
});
