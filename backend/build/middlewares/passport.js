"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const prisma_1 = __importDefault(require("../config/prisma"));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, function (email, password, verify) {
    const user = prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        return verify(null, false, { message: 'User not found' });
    }
    if (user.password !== password) {
        return verify(null, false, { message: 'Password incorrect' });
    }
}));
//# sourceMappingURL=passport.js.map