import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'

import { config } from './config'
import connect from './db-connection';

dotenv.config();


const app: Express = express();
const port = config.server.port;


//Create Connection with Mongo]
const connectMongo = async () => {
    try {
        await connect();
    } catch (error) {
        throw error
    }
}

connectMongo();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});