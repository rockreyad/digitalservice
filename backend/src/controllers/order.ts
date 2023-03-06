import dayjs from 'dayjs'
import { Request, Response } from 'express'
import {
    all_order,
    create_order,
    find_order_by_orderId,
    find_order_by_userId,
    update_order,
} from '../services/order'

function getErrorStatus(error: any) {
    return error.status || 500
}
//create an order
const create_an_order = async (req: Request, res: Response) => {
    const { userId, statusId, price, orderItems } = req.body

    if (!userId || !statusId || !price || !orderItems) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }

    const OrderData = {
        userId: String(userId),
        statusId: Number(statusId),
        price: Number(price),
        orderItems,
    }

    try {
        const createdOrder = await create_order(OrderData)

        let response = {
            status: true,
            message: 'Order created successfully',
            data: {
                orderId: createdOrder.id,
                userId: createdOrder.userId,
                statusId: createdOrder.statusId,
                price: createdOrder.price,
                orderItems: createdOrder.orderItems,
            },
        }

        //Response: Order created successfully
        return res.status(201).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: false,
            message: error,
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//Update an Order
const update_an_order = async (req: Request, res: Response) => {
    const { id, statusId } = req.body
    if (!id || !statusId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }
    const OrderData = {
        id: Number(id),
        statusId: Number(statusId),
    }
    try {
        const updatedOrder = await update_order(OrderData)
        let response = {
            status: true,
            message: 'Order updated successfully',
            data: {
                orderId: updatedOrder.id,
                userId: updatedOrder.userId,
                statusId: updatedOrder.statusId,
                price: updatedOrder.price,
                orderItems: updatedOrder.orderItems,
            },
        }
        //Response: Order updated successfully
        return res.status(201).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)
        let responseData = {
            status: false,
            message: error,
        }
        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//Get all order
const get_all_order = async (req: Request, res: Response) => {
    try {
        const foundOrder = await all_order()
        if (!foundOrder) {
            //Response: Order not found
            return res
                .status(404)
                .json({ status: false, message: 'Order not found' })
        }
        let response = {
            status: true,
            message: 'Order found successfully',
            data: foundOrder.map((order) => {
                return {
                    orderId: order.id,
                    user: order.user,
                    statusId: order.statusId,
                    statusType: order.status.name,
                    price: order.price,
                    orderItems: order.orderItems,
                    createAt: dayjs(order.createdAt).format('YYYY-MM-DD'),
                }
            }),
        }
        //Response: Order found successfully
        return res.status(200).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)
        let responseData = {
            status: false,
            message: error,
        }
        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//find an order by userId
const find_an_order = async (req: Request, res: Response) => {
    const { orderId } = req.body

    if (!orderId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }
    const OrderData = {
        id: Number(orderId),
    }
    try {
        const foundOrder = await find_order_by_orderId(OrderData)

        if (!foundOrder) {
            //Response: Order not found
            return res
                .status(404)
                .json({ status: false, message: 'Order not found' })
        }

        let response = {
            status: true,
            message: 'Order found successfully',
            data: {
                orderId: foundOrder.id,
                userId: foundOrder.userId,
                statusId: foundOrder.statusId,
                price: foundOrder.price,
                orderItems: foundOrder.orderItems,
            },
        }
        //Response: Order found successfully
        return res.status(201).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)
        let responseData = {
            status: false,
            message: error,
        }
        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//Get all order by userId
const get_all_order_by_userId = async (req: Request, res: Response) => {
    const { userId } = req.body
    if (!userId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }

    const OrderData = {
        userId: String(userId),
    }

    try {
        const foundOrders = await find_order_by_userId(OrderData)

        if (!foundOrders) {
            //Response: Order not found
            return res
                .status(404)
                .json({ status: false, message: 'Order not found' })
        }

        let response = {
            status: true,
            message: 'Order found successfully',
            data: foundOrders.map((order: any) => {
                return {
                    orderId: order.id,
                    userId: order.userId,
                    statusId: order.statusId,
                    price: order.price,
                    orderItems: order.orderItems,
                }
            }),
        }

        //Response: Order found successfully
        return res.status(200).json(response)
    } catch (error) {}
}

export {
    create_an_order,
    get_all_order,
    update_an_order,
    find_an_order,
    get_all_order_by_userId,
}
