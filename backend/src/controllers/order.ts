import dayjs from 'dayjs'
import { Request, Response } from 'express'
import generateInvoice from '../helpers/GenerateInvoice'
import {
    all_order,
    create_order,
    find_all_order_status,
    find_order_by_orderId,
    find_order_by_userId,
    update_order,
} from '../services/order'

function getErrorStatus(error: any) {
    return error.status || 500
}
//create an order
const create_an_order = async (req: Request, res: Response) => {
    const { userId, statusId, price, orderItems, requestUser } = req.body

    if (!userId || !statusId || !orderItems) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }

    const OrderData = {
        userId:
            requestUser.role === 'admin'
                ? String(userId)
                : String(requestUser.userId),
        statusId: Number(statusId),
        invoiceId: `INV-${dayjs().format('YYYYMMDDHHmmss')}`,
        price: Number(price),
        orderItems,
    }

    try {
        const createdOrder = await create_order(OrderData)

        //update the order with the invoice number
        await update_order({
            id: createdOrder.id,
            invoiceId: generateInvoice(createdOrder.id),
        })

        let response = {
            status: true,
            message: 'Order created successfully',
            data: {
                orderId: createdOrder.id,
                userId: createdOrder.userId,
                invoiceId: createdOrder.invoiceId,
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
    const { orderId } = req.params
    const { orderStatusId } = req.body
    if (!orderId && !orderStatusId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }
    const OrderData = {
        id: Number(orderId),
        statusId: Number(orderStatusId),
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

//Get all order
const get_all_order = async (req: Request, res: Response) => {
    try {
        const { requestUser } = req.body
        let foundOrder
        if (requestUser.role === 'admin') {
            foundOrder = await all_order()
        }
        if (requestUser.role === 'user') {
            foundOrder = await find_order_by_userId({
                userId: requestUser.userId,
            })
        }
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
                    invoiceId: order.invoiceId,
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
    const { orderId } = req.params

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
        const order = await find_order_by_orderId(OrderData)

        if (!order) {
            //Response: Order not found
            return res
                .status(404)
                .json({ status: false, message: 'Order not found' })
        }

        let response = {
            status: true,
            message: 'Order found successfully',
            data: {
                orderId: order.id,
                user: order.user,
                statusId: order.statusId,
                invoiceId: order.invoiceId,
                statusType: order.status.name,
                price: order.price,
                orderItems: order.orderItems,
                createAt: dayjs(order.createdAt).format('YYYY-MM-DD'),
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
    const { userId } = req.params
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

        if (foundOrders.length < 1) {
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

//Get all Order Status
const get_all_order_status = async (req: Request, res: Response) => {
    try {
        const foundOrderStatus = await find_all_order_status()

        if (foundOrderStatus.length < 1) {
            //Response: Order Status not found
            return res
                .status(404)
                .json({ status: false, message: 'Order Status not found' })
        }

        let response = {
            status: true,
            message: 'Order Status found successfully',
            data: foundOrderStatus.map((orderStatus: any) => {
                return {
                    statusId: orderStatus.id,
                    name: orderStatus.name,
                    description: orderStatus.description,
                }
            }),
        }

        //Response: Order Status found successfully
        return res.status(200).json(response)
    } catch (error) {}
}

export {
    create_an_order,
    get_all_order,
    update_an_order,
    find_an_order,
    get_all_order_by_userId,
    get_all_order_status,
}
