import {Socket} from "socket.io";
import {AuthServicePort} from "../../core/ports/auth";
import {SocketNotificationPort} from "../../core/ports/socket_notification";


export const clientSocketEventHandler = (
    socket: Socket,
    notificationPort: SocketNotificationPort,
    authService: AuthServicePort
) => {
    const token = socket.handshake.auth.token || socket.handshake.headers?.auth;
    // Authenticate the user using the token
    authService.authenticate(token).then((userDetails) => {
        if (userDetails) {
            // Store user details in socket session
            (socket as any).user = userDetails;
            // Join the user to their own room
            notificationPort.handleUserJoinRoom(socket, userDetails._id);
        } else {
            socket.emit("auth_error", {message: 'Authentication failed'});
            socket.disconnect();
        }
    }).catch((err) => {
        console.log(err)
        socket.emit("auth_error", {message: 'Authentication failed'});
        socket.disconnect();
    });
};
