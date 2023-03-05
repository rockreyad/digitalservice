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
exports.find_order_by_orderId = exports.find_order_by_userId = exports.update_order = exports.all_order = exports.create_order = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function create_order({ userId, statusId, price, orderItems, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield prisma_1.default.order.create({
            data: {
                userId,
                statusId,
                price,
                orderItems: {
                    create: orderItems,
                },
            },
            include: {
                orderItems: true,
            },
        });
        return order;
    });
}
exports.create_order = create_order;
function find_order_by_userId({ userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield prisma_1.default.order.findMany({
            where: {
                userId,
            },
            include: {
                orderItems: true,
            },
        });
        return order;
    });
}
exports.find_order_by_userId = find_order_by_userId;
function find_order_by_orderId({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
            include: {
                orderItems: true,
            },
        });
        return order;
    });
}
exports.find_order_by_orderId = find_order_by_orderId;
function update_order({ id, statusId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield prisma_1.default.order.update({
            where: {
                id,
            },
            data: {
                statusId,
            },
            include: {
                orderItems: true,
            },
        });
        return order;
    });
}
exports.update_order = update_order;
function all_order() {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield prisma_1.default.order.findMany({
            include: {
                orderItems: {
                    select: {
                        service: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        user_id: true,
                    },
                },
                status: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return order;
    });
}
exports.all_order = all_order;
//# sourceMappingURL=order.js.map