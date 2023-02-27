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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithEmailAndPassword = exports.RegisterAnUserWithEmailAndPassword = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getErrorStatus(error) {
    return error.status || 500;
}
const RegisterAnUserWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, phone, email, password } = req.body;
    if (!firstName || !lastName || !phone || !email || !password) {
        res.json({ message: "Please submit all the filed" });
    }
    let userData = {
        firstName,
        lastName,
        email,
        password,
        phone
    };
    try {
        const responseData = yield prisma.user.create({
            data: userData,
        });
        return res.json(responseData);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: "FAILED",
            message: error,
        };
        res.status(status || 500).json(responseData);
    }
});
exports.RegisterAnUserWithEmailAndPassword = RegisterAnUserWithEmailAndPassword;
const signInWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ message: "Please submit all the filed" });
    }
    let userData = {
        email,
        password,
    };
    try {
        const responseData = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!responseData) {
            res.json({ message: "User not found!" });
        }
        if ((responseData === null || responseData === void 0 ? void 0 : responseData.password) !== userData.password) {
            return res.json({ message: "Password Error!" });
        }
        return res.json(responseData);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: "FAILED",
            message: error,
        };
        res.status(status || 500).json(responseData);
    }
});
exports.signInWithEmailAndPassword = signInWithEmailAndPassword;
//# sourceMappingURL=authentication.js.map