//Listening
import server, {logger, serverPort, startApp} from "./app";

startApp().then(() => {
    server.listen(serverPort, () => {
        logger.info(`Server listening on port ${serverPort}`)
    })
})