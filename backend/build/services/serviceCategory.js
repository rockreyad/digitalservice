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
exports.find_all_services_by_category_id = exports.find_category_by_id = exports.delete_category = exports.find_first_category_by_id = exports.find_first_category = exports.update_category = exports.create_category = exports.all_category = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function create_category({ name, description, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma_1.default.serviceCategory.create({
            data: {
                name,
                description,
            },
        });
        return category;
    });
}
exports.create_category = create_category;
function all_category() {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma_1.default.serviceCategory.findMany();
        return category;
    });
}
exports.all_category = all_category;
function update_category({ id, description, name, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma_1.default.serviceCategory.update({
            where: {
                id,
            },
            data: {
                name,
                description,
            },
        });
        return category;
    });
}
exports.update_category = update_category;
function find_first_category({ name }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma_1.default.serviceCategory.findFirst({
            where: {
                name,
            },
        });
        return category;
    });
}
exports.find_first_category = find_first_category;
function find_first_category_by_id({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma_1.default.serviceCategory.findFirst({
            where: {
                id,
            },
        });
        return category;
    });
}
exports.find_first_category_by_id = find_first_category_by_id;
function delete_category({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma_1.default.serviceCategory.delete({
            where: {
                id,
            },
        });
        return category;
    });
}
exports.delete_category = delete_category;
function find_category_by_id({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma_1.default.serviceCategory.findMany({
            where: {
                id,
            },
        });
        return category;
    });
}
exports.find_category_by_id = find_category_by_id;
function find_all_services_by_category_id({ categoryId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield prisma_1.default.service.findMany({
            where: {
                categoryId,
            },
        });
        return service;
    });
}
exports.find_all_services_by_category_id = find_all_services_by_category_id;
//# sourceMappingURL=serviceCategory.js.map