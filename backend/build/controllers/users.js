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
exports.find_user = exports.all_users = void 0;
const user_1 = require("../services/user");
function getErrorStatus(error) {
    return error.status || 500;
}
const all_users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_1.user_list)();
        if (!users)
            //Response : User not Found
            return res
                .status(400)
                .json({ status: false, message: "No users found!" });
        let response = {
            status: true,
            message: `${users === null || users === void 0 ? void 0 : users.length} Users found`,
            data: users === null || users === void 0 ? void 0 : users.map((user) => {
                return {
                    userId: user.user_id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                };
            }),
        };
        //Response: UserList
        return res.status(200).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let response = {
            status: false,
            message: error,
        };
        res.status(status || 500).json(response);
    }
});
exports.all_users = all_users;
const find_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body || req.params;
    try {
        if (!email) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: "Please submit all the filed" });
        }
        const user = yield (0, user_1.get_user)({ email });
        if (!user) {
            //Response : User not Found
            return res
                .status(400)
                .json({ status: false, message: "User not found!" });
        }
        let response = {
            status: true,
            message: "User found",
            data: {
                userId: user.user_id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
            },
        };
        //Response: User
        return res.status(200).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let response = {
            status: false,
            message: error,
        };
        res.status(status || 500).json(response);
    }
});
exports.find_user = find_user;
//# sourceMappingURL=users.js.map