"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authorize = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decode = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        const { userId, role } = decode;
        let requestUser = {
            userId,
            role,
        };
        req.body.requestUser = requestUser;
        next();
    }
    catch (error) {
        res.status(401).json({ status: false, message: 'NO token provided' });
    }
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map