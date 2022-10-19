import express from 'express'
import path from 'path'
import config from 'config'
import { fileURLToPath } from 'url';
import {connectToMongo} from "./utils/connect.js";
import log from "./utils/logger.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import userProfileRoutes from "./routes/userProfile.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likedPostRoutes from "./routes/likedPost.routes.js";
import {cors} from "./middlewares/cors.middleware.js";
import tagRoutes from "./routes/tag.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = config.get('server-port')

app.use(cors)
app.use(express.json())

app.get('/uploads/:file', (req, res) => {
    const file = req.params.file
    res.sendFile(`${__dirname}/uploads/${file}`)
})

const start = async () => {
    await connectToMongo()

    app.listen(PORT, () => {
        log.info(`Server running on port ${PORT}`)
    })

    userRoutes(app)
    postRoutes(app)
    userProfileRoutes(app)
    commentRoutes(app)
    likedPostRoutes(app)
    tagRoutes(app)
}

start()