import {ObjectsHelpers} from "./helpers";

export type TaskParams = {
    _id?: string;
    name: string;
    ownerId: string;
    assigneeId: string;
    dueDate?: Date;
    state?: string;
    description?: string;
};

export default class Task {
    _id?: string;
    name?: string;
    ownerId?: string;
    assigneeId?: string;
    dueDate?: Date;
    state?: string;
    description?: string;

    constructor(params: TaskParams) {
        Object.assign(this, params);
    }

    get id() {
        return this._id
    }

    get data(): Partial<TaskParams> {
        return ObjectsHelpers.extractAttributesToData(this)
    }
}
