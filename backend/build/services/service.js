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
exports.find_first_service = exports.update_service = exports.all_service = exports.create_service = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function create_service({ title, description, categoryId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield prisma_1.default.service.create({
            data: {
                title,
                description,
                categoryId: categoryId,
            },
        });
        return service;
    });
}
exports.create_service = create_service;
function all_service() {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield prisma_1.default.service.findMany();
        return service;
    });
}
exports.all_service = all_service;
function update_service({ id, description, title, status, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield prisma_1.default.service.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                status,
            },
        });
        return service;
    });
}
exports.update_service = update_service;
function find_first_service({ title }) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield prisma_1.default.service.findFirst({
            where: {
                title,
            },
        });
        return service;
    });
}
exports.find_first_service = find_first_service;
//# sourceMappingURL=service.js.map