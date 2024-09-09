import {Socket} from "socket.io";

export interface SocketNotificationPort {
    notifyUser(userId: string, message: any): void;


    handleUserJoinRoom(socket: Socket, userId: string): void;
}