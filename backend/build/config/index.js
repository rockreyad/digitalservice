"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SEVER_PORT = process.env.SERVER_PORT;
const DATABASE_SERVER_URL = process.env.DATABASE_SERVER_URL;
const DATABASE_SERVER_PORT = process.env.DATABASE_SERVER_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
exports.config = {
    server: {
        port: SEVER_PORT
    },
    database: {
        name: DATABASE_NAME,
        server: DATABASE_SERVER_URL,
        port: DATABASE_SERVER_PORT,
    }
};
//# sourceMappingURL=index.js.map