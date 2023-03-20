//create a new payment for an order
import { Request, Response } from 'express'
import { find_order_by_orderId, find_order_by_userId } from '../services/order'
import {
    all_payment,
    all_user_payments,
    find_all_payment_for_an_order,
    new_payment,
} from '../services/payment'
import { pay_by_mobile_banking } from '../services/paymentMethod'

function getErrorStatus(error: any) {
    return error.status || 500
}

//create a new payment for an order
const create_a_payment = async (req: Request, res: Response) => {
    const { orderId, payment } = req.body

    if (!orderId || !payment) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }
    const payData = {
        orderId: Number(orderId),
        payment,
    }

    try {
        //find the order by id

        const createPayment = await new_payment({ orderId: payData.orderId })
        if (!createPayment) {
            //Response: Payment not created
            return res
                .status(400)
                .json({ status: false, message: 'Payment not created' })
        }

        //payment pay by mobile banking
        let paymentMethod: any
        switch (payment?.paymentMethod) {
            case 'mobile_banking':
                paymentMethod = await pay_by_mobile_banking({
                    paymentId: createPayment.id,
                    mobileBanking: payment?.mobileBanking,
                })
                break
            default:
                break
        }

        if (!paymentMethod) {
            //Response: Payment not created
            return res
                .status(400)
                .json({ status: false, message: 'Payment not created' })
        }

        let response = {
            status: true,
            message: 'Payment created successfully',
            data: {
                paymentId: createPayment.id,
                orderId: createPayment.orderId,
                paymentMethod: paymentMethod,
            },
        }

        //Response: Payment created successfully
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

//find all the payment for an order
const find_all_order_payments = async (req: Request, res: Response) => {
    const { userid, role } = req.body.requestUser
    const { orderId } = req.params

    try {
        if (role !== 'admin') {
            //order belongs to the user
            const user_all_orders = await find_order_by_userId({
                userId: userid,
            })

            if (!user_all_orders || user_all_orders.length <= 0) {
                //Response: Order not found
                return res
                    .status(400)
                    .json({ status: false, message: 'Order not found' })
            }

            //check if the order belongs to the user
            const order = user_all_orders.find(
                (order: any) => order.id === Number(orderId),
            )

            if (!order) {
                //Response: Order not found
                return res
                    .status(400)
                    .json({ status: false, message: 'Order not found' })
            }
        }

        if (!orderId) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: 'Missing required fields' })
        }

        //find the order by id
        const order = await find_order_by_orderId({ id: Number(orderId) })
        if (!order) {
            //Response: Order not found
            return res
                .status(400)
                .json({ status: false, message: 'Order not found' })
        }

        //find all the payment for an order
        const payment = await find_all_payment_for_an_order({
            orderId: Number(orderId),
        })
        if (!payment) {
            //Response: Payment not found
            return res
                .status(400)
                .json({ status: false, message: 'Payment not found' })
        }

        let response = {
            status: true,
            message: `Order ${order.id} has ${payment.length} payment`,
            data: payment,
        }

        //Response: Payment found successfully
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

//find all payment
const find_all_payments = async (req: Request, res: Response) => {
    try {
        const { role, userId } = req.body.requestUser
        //admin can find all the payment
        let payment
        if (role !== 'admin') {
            //find all the payment for a user
            payment = await all_user_payments(userId)
        } else {
            //find all the payment
            payment = await all_payment()
        }
        if (!payment) {
            //Response: Payment not found
            return res
                .status(400)
                .json({ status: false, message: 'Payment not found' })
        }

        let response = {
            status: true,
            message: `${payment.length} payment found`,
            data: payment,
        }

        //Response: Payment found successfully
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

export { create_a_payment, find_all_order_payments, find_all_payments }
