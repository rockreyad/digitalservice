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
exports.login_user = exports.create_user = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function create_user({ firstName, lastName, email, password, phone, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const createaccount = prisma_1.default.user.create({
            data: {
                firstName,
                lastName,
                password,
                email,
                phone,
                role: {
                    create: {
                        roleDescriptionId: 2,
                    },
                },
            },
            include: {
                role: {
                    select: {
                        role: {
                            select: {
                                role_name: true,
                            },
                        },
                    },
                },
            },
        });
        return createaccount;
    });
}
exports.create_user = create_user;
function login_user({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
            include: {
                role: {
                    select: {
                        role: {
                            select: {
                                role_name: true,
                            },
                        },
                    },
                },
            },
        });
        return user;
    });
}
exports.login_user = login_user;
//# sourceMappingURL=auth.js.map