import {SocketNotificationPort} from "../ports/socket_notification";
import Task from "../entities/task";

type NotifyTaskEventsParams = {
    notificationPort: SocketNotificationPort
}

enum NotificationTaskEventType {
    CREATED = "TASK_CREATED",
    DELETED = "TASK_DELETED",
    UPDATED = "TASK_UPDATED",
    STATE_CHANGED = "TASK_STATE_CHANGED"
}

export class NotifyTaskEvents {
    private notificationPort;

    constructor(params: NotifyTaskEventsParams) {
        this.notificationPort = params.notificationPort;
    }

    notifyTaskCreated(task: Task) {
        this.notificationPort.notifyUser(task.assigneeId as string, {
            type: NotificationTaskEventType.CREATED,
            data: task.data
        });
    }

    notifyTaskDeleted(task: Task) {
        this.notificationPort.notifyUser(task.assigneeId as string, {
            type: NotificationTaskEventType.DELETED,
            data: task.data
        });
    }

    notifyTaskUpdated(task: Task) {
        this.notificationPort.notifyUser(task.ownerId as string, {
            type: NotificationTaskEventType.STATE_CHANGED,
            data: task.data
        });
        if (task.ownerId !== task.assigneeId){
            this.notificationPort.notifyUser(task.assigneeId as string, {
                type: NotificationTaskEventType.STATE_CHANGED,
                data: task.data
            });
        }
    }

    notifyTaskStateChanged(task: Task) {
        this.notificationPort.notifyUser(task.ownerId as string, {
            type: NotificationTaskEventType.STATE_CHANGED,
            data: task.data
        });
        if (task.ownerId !== task.assigneeId){
            this.notificationPort.notifyUser(task.assigneeId as string, {
                type: NotificationTaskEventType.STATE_CHANGED,
                data: task.data
            });
        }
    }
}
