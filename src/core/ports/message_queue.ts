import {Channel} from "amqplib";

export interface MessageQueuePort {
    channel: Channel | null

    connectAndConsume(queueName: string): Promise<void>;
}
