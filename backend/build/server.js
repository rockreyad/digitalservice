"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = config_1.config.server.port;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/** Rules for our Api */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    /** Routes Index */
    (0, routes_1.default)(app);
});
//# sourceMappingURL=server.js.map