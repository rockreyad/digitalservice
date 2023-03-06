import dotenv from 'dotenv'

dotenv.config()

const SEVER_PORT = process.env.SERVER_PORT

export const config = {
    server: {
        port: SEVER_PORT,
    },
}
