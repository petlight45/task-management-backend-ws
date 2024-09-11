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
        this._id = params._id
        this.name = params.name
        this.ownerId = params.ownerId
        this.assigneeId = params.assigneeId
        this.dueDate = params.dueDate
        this.state = params.state
        this.description = params.description
    }

    get id() {
        return this._id
    }

    get data(): Partial<TaskParams> {
        return ObjectsHelpers.extractAttributesToData(this)
    }
}
