"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoNotificationAdapter = void 0;
class SocketIoNotificationAdapter {
    constructor(params) {
        this.io = params.io;
    }
    notifyUser(userId, message) {
        this.io.to(userId).emit('notification', message);
    }
    handleUserJoinRoom(socket, userId) {
        socket.join(userId);
    }
}
exports.SocketIoNotificationAdapter = SocketIoNotificationAdapter;
