"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
class Task {
    constructor(params) {
        Object.assign(this, params);
    }
    get id() {
        return this._id;
    }
    get data() {
        return helpers_1.ObjectsHelpers.extractAttributesToData(this);
    }
}
exports.default = Task;
