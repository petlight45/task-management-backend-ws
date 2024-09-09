import {Server, Socket} from "socket.io";
import {SocketNotificationPort} from "../../core/ports/socket_notification";

type SocketIoNotificationAdapterParams = {
    io: Server
}

export class SocketIoNotificationAdapter implements SocketNotificationPort {
    private io: Server;

    constructor(params: SocketIoNotificationAdapterParams) {
        this.io = params.io;
    }

    notifyUser(userId: string, message: any): void {
        this.io.to(userId).emit('notification', message);
    }

    handleUserJoinRoom(socket: Socket, userId: string) {
        socket.join(userId);
    }
}
