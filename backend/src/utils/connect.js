import config from "config";
import mongoose from "mongoose";
import log from "./logger.js";

export async function connectToMongo() {
    const dbURL = config.get('dbURL')

    try {
        await mongoose.connect(dbURL)
        log.info('Connected to Mongo')
    } catch (e) {
        log.error('Could not to connect to Mongo')
        process.exit(1)
    }
}