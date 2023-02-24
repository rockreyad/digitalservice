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
exports.get_service_list = exports.new_service = void 0;
const client_1 = require("@prisma/client");
function getErrorStatus(error) {
    return error.status || 500;
}
const prisma = new client_1.PrismaClient();
const service_1 = require("../services/service");
const new_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const responseData = yield prisma.service.create({
            data: { title, description },
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
exports.new_service = new_service;
//get service list
const get_service_list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield (0, service_1.read)();
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
exports.get_service_list = get_service_list;
//# sourceMappingURL=services.js.map