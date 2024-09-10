import {asClass, asValue, AwilixContainer, createContainer} from 'awilix';
import {NotifyTaskEvents} from "../core/usecases/notify_task_events";
import {SocketNotificationPort} from "../core/ports/socket_notification";
import {AuthServicePort} from "../core/ports/auth";
import {Server} from "socket.io";
import AppConfig from "../config";
import {SocketIoNotificationAdapter} from "../adapters/ws/socket_notification";
import {MessageQueuePort} from "../core/ports/message_queue";
import {AuthServiceAdapter} from "../adapters/http/auth";
import {RabbitMQAdapter} from "../adapters/message_queue/rabbit_mq";
import {LoggerPort} from "../core/ports/logger";
import {WinstonLogger} from "../adapters/logger/winston";

type ContainerDependencies = {
    notifyTaskEvents: NotifyTaskEvents;
    notificationPort: SocketNotificationPort;
    authServicePort: AuthServicePort;
    messageQueuePort: MessageQueuePort;
    io: Server | null
    appConfig: any,
    logger: LoggerPort
}

AppConfig.initiate()


const container: AwilixContainer<ContainerDependencies> = createContainer<ContainerDependencies>();


container.register({
    notifyTaskEvents: asClass(NotifyTaskEvents).singleton(),
    notificationPort: asClass(SocketIoNotificationAdapter).singleton(),
    authServicePort: asClass(AuthServiceAdapter).singleton(),
    messageQueuePort: asClass(RabbitMQAdapter).singleton(),
    appConfig: asValue(AppConfig),
    io: asValue(null),// Placeholder, will be set in app.ts,
    logger: asClass(WinstonLogger).singleton()
});

export default container;