"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SEVER_PORT = process.env.SERVER_PORT;
const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const BCRYPT_SALT_OR_ROUNDS = Number(process.env.BCRYPT_SALT_OR_ROUNDS);
exports.config = {
    server: {
        port: SEVER_PORT,
    },
    jwt: {
        secret: JWT_KEY,
        expiresIn: JWT_EXPIRES_IN,
    },
    bcrypt: {
        saltOrRound: BCRYPT_SALT_OR_ROUNDS,
    },
};
//# sourceMappingURL=index.js.map