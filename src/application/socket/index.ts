import {Server as SocketIOServer} from 'socket.io';
import {LoggerPort} from "../../core/ports/logger";

const createAppSocketServer = (server: any, logger: LoggerPort) => {
    return new SocketIOServer(server, {
        cors: {
            origin: true,
            credentials: true
        }
    });
};

export default createAppSocketServer;
