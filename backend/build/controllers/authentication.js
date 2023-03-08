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
exports.signInWithEmailAndPassword = exports.RegisterAnUserWithEmailAndPassword = void 0;
const auth_1 = require("../services/auth");
const user_1 = require("../services/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function getErrorStatus(error) {
    return error.status || 500;
}
const RegisterAnUserWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstName, lastName, phone, email, password } = req.body;
    if (!firstName || !lastName || !phone || !email || !password) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Please submit all the filed' });
    }
    const salt = yield bcrypt_1.default.genSalt(config_1.config.bcrypt.saltOrRound);
    const hash = yield bcrypt_1.default.hash(password, salt);
    let userData = {
        firstName,
        lastName,
        email,
        password: hash,
        phone,
    };
    try {
        //if user already exists
        const duplicateUser = yield (0, user_1.get_user)({ email });
        if (duplicateUser) {
            //Response: User already exists
            return res.status(380).json({
                status: false,
                message: 'Registration Fields! User already exists!',
            });
        }
        const createdUser = yield (0, auth_1.create_user)(userData);
        let jwtToken = yield jsonwebtoken_1.default.sign({
            userId: createdUser.user_id,
            role: (_a = createdUser.role[0]) === null || _a === void 0 ? void 0 : _a.role.role_name,
        }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const response = {
            status: true,
            message: 'Registration success!',
            data: { token: jwtToken, expiresIn: config_1.config.jwt.expiresIn },
        };
        //Response: User created successfully
        return res.status(201).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: 'FAILED',
            message: error,
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
});
exports.RegisterAnUserWithEmailAndPassword = RegisterAnUserWithEmailAndPassword;
const signInWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            //Response: Mandatory fields are missing
            return res.status(400).json({
                status: false,
                message: 'Please submit all the filed',
            });
        }
        let userData = {
            email,
            password,
        };
        const user = yield (0, auth_1.login_user)(userData);
        if (!user) {
            //Response: User not exists
            return res
                .status(404)
                .json({ status: false, message: 'User not found!' });
        }
        const validPassword = yield bcrypt_1.default.compare(userData.password, user.password);
        if (!validPassword) {
            //Response: Password not Matched
            return res
                .status(401)
                .json({ status: false, message: 'Password is incorrect!' });
        }
        let jwtToken = yield jsonwebtoken_1.default.sign({
            userId: user.user_id,
            role: (_b = user.role[0]) === null || _b === void 0 ? void 0 : _b.role.role_name,
        }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
        const response = {
            status: true,
            message: 'Login success!',
            data: { token: jwtToken, expiresIn: config_1.config.jwt.expiresIn },
        };
        //Response: Login success
        return res.status(200).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: 'Authentication Field',
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
});
exports.signInWithEmailAndPassword = signInWithEmailAndPassword;
//# sourceMappingURL=authentication.js.map