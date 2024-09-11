import container from "../../infrastructure/container";
import server, {logger, serverPort, startApp} from "../../app";
import {asFunction} from "awilix";
import {AuthServicePort} from "../../core/ports/auth";
import {MockAuthService} from "../mocks/AuthService";
import MockHelperUtils from "../mocks";
import User from "../../core/entities/user";
import Client from 'socket.io-client';

describe('App Integration Tests', () => {
    let authUser: User
    let messageQueueName: string;
    let authService: AuthServicePort;
    let appServerURL;

    beforeAll(async () => {
        container.register('authServicePort', asFunction(() => MockAuthService));
        await startApp();
        authUser = MockHelperUtils.generateMockUser()
        MockAuthService.authenticate.mockResolvedValue(authUser)
        const appConfig = container.resolve('appConfig');
        authService = container.resolve('appConfig');
        appServerURL = `ws://127.0.0.1:${appConfig.SERVER_PORT}`
        messageQueueName = appConfig.MESSAGE_QUEUE_NAME
        server.listen(serverPort, () => {
            logger.info(`Server listening on port ${serverPort}`)
        })
    });

    afterEach(() => {
        // Ensure all timeouts and intervals are cleared
        jest.clearAllTimers();
    });



    it('should connect to the websocket', (done) => {
        const socket = Client(appServerURL);
        socket.on('connect', () => {
            done()
        });
    }, 5000);


    it('should receive event from the backend - task created', (done) => {
        const socket = Client(appServerURL);
        socket.on('connect', () => {
            const notifyTaskEvents = container.resolve('notifyTaskEvents');
            const task = MockHelperUtils.generateMockTask(authUser._id, authUser._id)
            notifyTaskEvents.notifyTaskCreated(task)
            socket.on("notification", (e) => {
                done()
            })
        });

    }, 5000);

    it('should receive event from the backend - task updated', (done) => {
        const socket = Client(appServerURL);
        socket.on('connect', () => {
            const notifyTaskEvents = container.resolve('notifyTaskEvents');
            const task = MockHelperUtils.generateMockTask(authUser._id, authUser._id)
            notifyTaskEvents.notifyTaskUpdated(task)
            socket.on("notification", (e) => {
                done()
            })
        });

    }, 5000);


    it('should receive event from the backend - task deleted', (done) => {
        const socket = Client(appServerURL);
        socket.on('connect', () => {
            const notifyTaskEvents = container.resolve('notifyTaskEvents');
            const task = MockHelperUtils.generateMockTask(authUser._id, authUser._id)
            notifyTaskEvents.notifyTaskDeleted(task)
            socket.on("notification", (e) => {
                done()
            })
        });

    }, 5000);


    it('should receive event from the backend - task state changed', (done) => {
        const socket = Client(appServerURL);
        socket.on('connect', () => {
            const notifyTaskEvents = container.resolve('notifyTaskEvents');
            const task = MockHelperUtils.generateMockTask(authUser._id, authUser._id)
            notifyTaskEvents.notifyTaskStateChanged(task)
            socket.on("notification", (e) => {
                done()
            })
        });
    }, 5000);


    it('should receive event from the backend - task created - initiated by message queue', (done) => {
        const socket = Client(appServerURL);
        socket.on('connect', () => {
            const messageQueue = container.resolve('messageQueuePort');
            const task = MockHelperUtils.generateMockTask(authUser._id, authUser._id)
            messageQueue.sendMessage(messageQueueName, {eventType: "ON_TASK_CREATED", payload: task})
            messageQueue.sendMessage(messageQueueName, {eventType: "ON_TASK_CREATED", payload: task})
            messageQueue.sendMessage(messageQueueName, {eventType: "ON_TASK_CREATED", payload: task})
            socket.on("notification", (e) => {
                done()
            })
        });

    }, 20000);

});