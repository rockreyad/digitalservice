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
exports.read = exports.create_service = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function create_service(title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield prisma.service.create({
            data: {
                title,
                description,
            },
        });
        return service;
    });
}
exports.create_service = create_service;
function read() {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield prisma.service.findMany();
        return service;
    });
}
exports.read = read;
//# sourceMappingURL=service.js.map