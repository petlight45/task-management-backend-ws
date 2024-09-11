import {faker} from '@faker-js/faker';
import User from "../../core/entities/user";
import Task from "../../core/entities/task";

export default class MockHelperUtils {
    static generateMockUser(): User {
        const id_ = faker.database.mongodbObjectId()
        return {
            id: id_,
            _id: id_,
            username: faker.internet.userName(),
            email: faker.internet.email(),
            dataMini: {}
        };
    }

    static generateMockTask(ownerId?: string, assigneeId?: string): Task {
        const id_ = faker.database.mongodbObjectId()
        const data_ = {
            id: id_,
            _id: id_,
            name: faker.lorem.words(3),
            assigneeId: assigneeId || faker.database.mongodbObjectId(),
            dueDate: faker.date.future().toString(),
            state: faker.lorem.words(1),
            description: faker.lorem.paragraph(),
            ownerId: ownerId || faker.database.mongodbObjectId()
        }
        return {
            ...data_,
            data: data_
        };

    }
}