"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSocketEventHandler = void 0;
const clientSocketEventHandler = (socket, notificationPort, authService) => {
    var _a;
    const token = socket.handshake.auth.token || ((_a = socket.handshake.headers) === null || _a === void 0 ? void 0 : _a.auth);
    // Authenticate the user using the token
    authService.authenticate(token).then((userDetails) => {
        if (userDetails) {
            // Store user details in socket session
            socket.user = userDetails;
            // Join the user to their own room
            notificationPort.handleUserJoinRoom(socket, userDetails._id);
        }
        else {
            socket.emit("auth_error", { message: 'Authentication failed' });
            socket.disconnect();
        }
    }).catch((err) => {
        console.log(err);
        socket.emit("auth_error", { message: 'Authentication failed' });
        socket.disconnect();
    });
};
exports.clientSocketEventHandler = clientSocketEventHandler;
