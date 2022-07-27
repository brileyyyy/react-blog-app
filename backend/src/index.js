import express from 'express'
import config from 'config'
import {connectToMongo} from "./utils/connect.js";
import log from "./utils/logger.js";

const app = express()
const PORT = config.get('server-port')

const start = async () => {
    await connectToMongo()
    app.listen(PORT, () => {
        log.info(`Server running on port ${PORT}`)
    })
}

start()