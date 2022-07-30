import express from 'express'
import config from 'config'
import {connectToMongo} from "./utils/connect.js";
import log from "./utils/logger.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import {cors} from "./middlewares/cors.middleware.js";

const app = express()
const PORT = config.get('server-port')

app.use(cors)
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const start = async () => {
    await connectToMongo()

    app.listen(PORT, () => {
        log.info(`Server running on port ${PORT}`)
    })

    authRoutes(app)
    postRoutes(app)
    uploadRoutes(app)
}

start()