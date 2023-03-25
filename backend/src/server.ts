import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'

import { config } from './config'
import routes from './routes'
import Logger from './utils/Logger'

dotenv.config()

const app: Express = express()
const port = config.server.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** Rules for our Api */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )

    if (req.method == 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE')

        return res.status(200).json({
            message: 'OK',
        })
    }
    /** Log the client request */
    Logger.incoming(
        `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
    )

    res.on('finish', () => {
        /** Log the server response */
        Logger.response(
            `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`,
        )
    })

    next()
})

app.listen(port, () => {
    Logger.info(`⚡: Server is running at https://localhost:${port}`)
    /** Routes Index */
    routes(app)
})
