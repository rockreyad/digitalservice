import dotenv from 'dotenv'

dotenv.config()


const SEVER_PORT = process.env.SERVER_PORT;
const DATABASE_SERVER_URL = process.env.DATABASE_SERVER_URL;
const DATABASE_SERVER_PORT = process.env.DATABASE_SERVER_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;

export const config = {
    server: {
        port: SEVER_PORT
    },
    database: {
        name: DATABASE_NAME,
        server: DATABASE_SERVER_URL,
        port: DATABASE_SERVER_PORT,
    }
}