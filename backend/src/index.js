import express from 'express'
import config from 'config'
import {connectToMongo} from "./utils/connect.js";
import log from "./utils/logger.js";
import authRoutes from "./routes/auth.routes.js";

const app = express()
const PORT = config.get('server-port')

app.use(express.json())

const start = async () => {
    await connectToMongo()

    app.listen(PORT, () => {
        log.info(`Server running on port ${PORT}`)
    })

    authRoutes(app)
}

start()