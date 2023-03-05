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
exports.get_all_order_by_userId = exports.find_an_order = exports.update_an_order = exports.get_all_order = exports.create_an_order = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const order_1 = require("../services/order");
function getErrorStatus(error) {
    return error.status || 500;
}
//create an order
const create_an_order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, statusId, price, orderItems } = req.body;
    if (!userId || !statusId || !price || !orderItems) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: "Missing required fields" });
    }
    const OrderData = {
        userId: String(userId),
        statusId: Number(statusId),
        price: Number(price),
        orderItems,
    };
    try {
        const createdOrder = yield (0, order_1.create_order)(OrderData);
        let response = {
            status: true,
            message: "Order created successfully",
            data: {
                orderId: createdOrder.id,
                userId: createdOrder.userId,
                statusId: createdOrder.statusId,
                price: createdOrder.price,
                orderItems: createdOrder.orderItems,
            },
        };
        //Response: Order created successfully
        return res.status(201).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: error,
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
});
exports.create_an_order = create_an_order;
//Update an Order
const update_an_order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, statusId } = req.body;
    if (!id || !statusId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: "Missing required fields" });
    }
    const OrderData = {
        id: Number(id),
        statusId: Number(statusId),
    };
    try {
        const updatedOrder = yield (0, order_1.update_order)(OrderData);
        let response = {
            status: true,
            message: "Order updated successfully",
            data: {
                orderId: updatedOrder.id,
                userId: updatedOrder.userId,
                statusId: updatedOrder.statusId,
                price: updatedOrder.price,
                orderItems: updatedOrder.orderItems,
            },
        };
        //Response: Order updated successfully
        return res.status(201).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: error,
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
});
exports.update_an_order = update_an_order;
//Get all order
const get_all_order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundOrder = yield (0, order_1.all_order)();
        if (!foundOrder) {
            //Response: Order not found
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }
        let response = {
            status: true,
            message: "Order found successfully",
            data: foundOrder.map((order) => {
                return {
                    orderId: order.id,
                    user: order.user,
                    statusId: order.statusId,
                    statusType: order.status.name,
                    price: order.price,
                    orderItems: order.orderItems,
                    createAt: (0, dayjs_1.default)(order.createdAt).format("YYYY-MM-DD"),
                };
            }),
        };
        //Response: Order found successfully
        return res.status(200).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: error,
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
});
exports.get_all_order = get_all_order;
//find an order by userId
const find_an_order = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    if (!orderId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: "Missing required fields" });
    }
    const OrderData = {
        id: Number(orderId),
    };
    try {
        const foundOrder = yield (0, order_1.find_order_by_orderId)(OrderData);
        if (!foundOrder) {
            //Response: Order not found
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }
        let response = {
            status: true,
            message: "Order found successfully",
            data: {
                orderId: foundOrder.id,
                userId: foundOrder.userId,
                statusId: foundOrder.statusId,
                price: foundOrder.price,
                orderItems: foundOrder.orderItems,
            },
        };
        //Response: Order found successfully
        return res.status(201).json(response);
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: error,
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
});
exports.find_an_order = find_an_order;
//Get all order by userId
const get_all_order_by_userId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: "Missing required fields" });
    }
    const OrderData = {
        userId: String(userId),
    };
    try {
        const foundOrders = yield (0, order_1.find_order_by_userId)(OrderData);
        if (!foundOrders) {
            //Response: Order not found
            return res
                .status(404)
                .json({ status: false, message: "Order not found" });
        }
        let response = {
            status: true,
            message: "Order found successfully",
            data: foundOrders.map((order) => {
                return {
                    orderId: order.id,
                    userId: order.userId,
                    statusId: order.statusId,
                    price: order.price,
                    orderItems: order.orderItems,
                };
            }),
        };
        //Response: Order found successfully
        return res.status(200).json(response);
    }
    catch (error) { }
});
exports.get_all_order_by_userId = get_all_order_by_userId;
//# sourceMappingURL=order.js.map