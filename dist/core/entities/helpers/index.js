"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectsHelpers = void 0;
class ObjectsHelpers {
    static extractAttributesToData(object_) {
        const data_ = {};
        for (const [key, value] of Object.entries(object_)) {
            if (value !== null && value !== undefined) {
                data_[key] = value;
            }
        }
        return data_;
    }
}
exports.ObjectsHelpers = ObjectsHelpers;
