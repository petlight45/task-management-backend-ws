"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(params) {
        Object.assign(this, params);
    }
    get id() {
        return this._id;
    }
}
exports.default = User;
