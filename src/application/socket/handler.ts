import {Socket} from "socket.io";
import {AuthServicePort} from "../../core/ports/auth";
import {SocketNotificationPort} from "../../core/ports/socket_notification";
import {LoggerPort} from "../../core/ports/logger";


export const clientSocketEventHandler = (
    socket: Socket,
    notificationPort: SocketNotificationPort,
    authService: AuthServicePort,
    logger: LoggerPort
) => {
    // Handle emit log
    socket.onAny((event, ...args) => {
        logger.info(`Event '${event}' emitted from ${socket.id} with args: ${JSON.stringify(args)}`);
    });

    // Handle disconnection log
    socket.on('disconnect', () => {
        logger.info(`Client ${socket.id} disconnected`);
    });
    const token = socket.handshake.auth.token || socket.handshake.headers?.auth;
    // Authenticate the user using the token
    authService.authenticate(token).then((userDetails) => {
        if (userDetails) {
            // Store user details in socket session
            (socket as any).user = userDetails;
            // Join the user to their own room
            notificationPort.handleUserJoinRoom(socket, userDetails._id);
        } else {
            logger.error("Authentication Failed")
            socket.emit("auth_error", {message: 'Authentication failed'});
            socket.disconnect();
        }
    }).catch((err) => {
        logger.error(err as string | Error)
        socket.emit("auth_error", {message: 'Authentication failed'});
        socket.disconnect();
    });
};
