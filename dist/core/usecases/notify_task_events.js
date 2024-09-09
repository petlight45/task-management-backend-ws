"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyTaskEvents = void 0;
var NotificationTaskEventType;
(function (NotificationTaskEventType) {
    NotificationTaskEventType["CREATED"] = "TASK_CREATED";
    NotificationTaskEventType["DELETED"] = "TASK_DELETED";
    NotificationTaskEventType["UPDATED"] = "TASK_UPDATED";
    NotificationTaskEventType["STATE_CHANGED"] = "TASK_STATE_CHANGED";
})(NotificationTaskEventType || (NotificationTaskEventType = {}));
class NotifyTaskEvents {
    constructor(params) {
        this.notificationPort = params.notificationPort;
    }
    notifyTaskCreated(task) {
        this.notificationPort.notifyUser(task.assigneeId, {
            type: NotificationTaskEventType.CREATED,
            data: task.data
        });
    }
    notifyTaskDeleted(task) {
        this.notificationPort.notifyUser(task.assigneeId, {
            type: NotificationTaskEventType.DELETED,
            data: task.data
        });
    }
    notifyTaskUpdated(task) {
        this.notificationPort.notifyUser(task.ownerId, {
            type: NotificationTaskEventType.STATE_CHANGED,
            data: task.data
        });
        if (task.ownerId !== task.assigneeId) {
            this.notificationPort.notifyUser(task.assigneeId, {
                type: NotificationTaskEventType.STATE_CHANGED,
                data: task.data
            });
        }
    }
    notifyTaskStateChanged(task) {
        this.notificationPort.notifyUser(task.ownerId, {
            type: NotificationTaskEventType.STATE_CHANGED,
            data: task.data
        });
        if (task.ownerId !== task.assigneeId) {
            this.notificationPort.notifyUser(task.assigneeId, {
                type: NotificationTaskEventType.STATE_CHANGED,
                data: task.data
            });
        }
    }
}
exports.NotifyTaskEvents = NotifyTaskEvents;
