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
exports.set_role = exports.get_role = exports.create_role = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function create_role({ userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = yield prisma_1.default.role.create({
            data: {
                userId,
                roleDescriptionId: 2,
            },
            select: {
                role: {
                    select: {
                        role_name: true,
                    },
                },
            },
        });
        return role;
    });
}
exports.create_role = create_role;
function get_role({ userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = yield prisma_1.default.role.findMany({
            where: {
                userId,
            },
            include: {
                role: {
                    select: {
                        role_name: true,
                        description: true,
                    },
                },
            },
        });
        return role;
    });
}
exports.get_role = get_role;
function set_role({ roleId, roleDescriptionId = 2, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = yield prisma_1.default.role.update({
            where: {
                id: roleId,
            },
            data: {
                roleDescriptionId,
            },
        });
        return role;
    });
}
exports.set_role = set_role;
//# sourceMappingURL=role.js.map