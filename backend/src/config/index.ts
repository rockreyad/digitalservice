import dotenv from 'dotenv'

dotenv.config()

const SEVER_PORT = process.env.SERVER_PORT
const JWT_KEY = process.env.JWT_KEY
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const BCRYPT_SALT_OR_ROUNDS = Number(process.env.BCRYPT_SALT_OR_ROUNDS)

export const config = {
    server: {
        port: SEVER_PORT,
    },
    jwt: {
        secret: JWT_KEY as string,
        expiresIn: JWT_EXPIRES_IN as string,
    },
    bcrypt: {
        saltOrRound: BCRYPT_SALT_OR_ROUNDS as number,
    },
}
