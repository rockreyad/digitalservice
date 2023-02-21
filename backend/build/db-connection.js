"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbUrl = config_1.config.database.server;
            const port = config_1.config.database.port;
            const dbName = config_1.config.database.name;
            yield mongoose_1.default
                .connect(`mongodb://${dbUrl}:${port}/${dbName}`)
                .then(() => console.log("Database Connected!"))
                .catch((error) => console.log(error));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = connect;
//# sourceMappingURL=db-connection.js.map