import amqp, {Channel} from "amqplib";
import {NotifyTaskEvents} from "../../core/usecases/notify_task_events";
import {MessageQueuePort} from "../../core/ports/message_queue";
import Task from "../../core/entities/task";
import {LoggerPort} from "../../core/ports/logger";

type RabbitMQAdapterParams = {
    notifyTaskEvents: NotifyTaskEvents
    appConfig: any
    logger: LoggerPort
}

export class RabbitMQAdapter implements MessageQueuePort {
    private notifyTaskEvents;
    private appConfig;
    private logger;
    channel: Channel | null;


    constructor(params: RabbitMQAdapterParams) {
        this.notifyTaskEvents = params.notifyTaskEvents;
        this.appConfig = params.appConfig;
        this.logger = params.logger
        this.channel = null;
    }

    async connectAndConsume(queueName: string): Promise<void> {
        const connection = await amqp.connect(this.appConfig.RABBIT_MQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        this.channel = channel;
        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const message = msg.content.toString()
                this.logger.info(`Received message from queue | ${message}`)
                const task = JSON.parse(message);
                this.routeMessage(task);
                channel.ack(msg);
            }
        });
    }

    private routeMessage(task: any) {
        switch (task.eventType) {
            case "ON_TASK_CREATED":
                this.notifyTaskEvents.notifyTaskCreated(new Task(task.payload));
                break;
            case "ON_TASK_DELETED":
                this.notifyTaskEvents.notifyTaskDeleted(new Task(task.payload));
                break;
            case "ON_TASK_UPDATED":
                this.notifyTaskEvents.notifyTaskUpdated(new Task(task.payload));
                break;
            case "ON_TASK_STATE_CHANGED":
                this.notifyTaskEvents.notifyTaskStateChanged(new Task(task.payload));
                break;
            default:
                break;
        }

    }
}
