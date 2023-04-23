const SERVER_PORT = process.env.NEXT_SERVER_PORT
const SERVER_HOST = process.env.NEXT_SERVER_HOST

const config = {
    server: {
        host: SERVER_HOST,
        port: SERVER_PORT,
    },
}

export default config
