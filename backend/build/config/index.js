"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SEVER_PORT = process.env.SERVER_PORT;
exports.config = {
    server: {
        port: SEVER_PORT,
    },
};
//# sourceMappingURL=index.js.map