//create a new payment for an order
import dayjs from 'dayjs'
import { Request, Response } from 'express'
import { find_order_by_orderId, find_order_by_userId } from '../services/order'
import {
    all_payment,
    all_user_payments,
    find_all_payment_for_an_order,
    new_payment,
    find_payment_by_id,
    update_payment_status,
} from '../services/payment'
import {
    pay_by_bank,
    pay_by_cash,
    pay_by_debit_card,
    pay_by_mobile_banking,
} from '../services/paymentMethod'

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
        //total price of the order
        //find the order by id
        const order = await find_order_by_orderId({ id: payData.orderId })

        if (!order) {
            //Response: Order not found
            return res
                .status(400)
                .json({ status: false, message: 'Order not found' })
        }
        //find all the payment for an order
        const allPayment = await find_all_payment_for_an_order({
            orderId: payData.orderId,
        })

        //total amount paid for the order
        let totalAmountPaid = 0
        allPayment.forEach((payment) => {
            if (payment.cashPayment?.amount) {
                totalAmountPaid += payment.cashPayment.amount
            }
            if (payment.bank?.amount) {
                totalAmountPaid += payment.bank.amount
            }
            if (payment.debitCard?.amount) {
                totalAmountPaid += payment.debitCard.amount
            }
            if (payment.mobileBanking?.amount) {
                totalAmountPaid += payment.mobileBanking.amount
            }
        })
        let duePrice = order?.price! - totalAmountPaid

        if (duePrice <= 0) {
            //Response: Order already paid
            return res
                .status(400)
                .json({ status: false, message: 'Order already paid' })
        }

        if (
            Number(payData.payment.amount) >= duePrice ||
            (duePrice < 1 && duePrice > 0)
        ) {
            //change the paymentStatus to Complete

            if (payData.payment.cashPayment) {
                payData.payment.cashPayment.paymentStatus = 3
            }
            if (payData.payment.bank) {
                payData.payment.bank.paymentStatus = 3
            }
            if (payData.payment.debitCard) {
                payData.payment.debitCard.paymentStatus = 3
            }
            if (payData.payment.mobileBanking) {
                payData.payment.mobileBanking.paymentStatus = 3
            }
        }
        //create a new payment
        const createPayment = await new_payment({ orderId: payData.orderId })
        if (!createPayment) {
            //Response: Payment not created
            return res
                .status(400)
                .json({ status: false, message: 'Payment not created' })
        }

        //payment method
        let paymentMethod: any
        switch (payment?.paymentMethod) {
            case 'cash':
                paymentMethod = await pay_by_cash({
                    paymentId: createPayment.id,
                    amount: Number(payment?.amount),
                    cashPayment: payment?.cashPayment,
                })
                break
            case 'mobile_banking':
                paymentMethod = await pay_by_mobile_banking({
                    paymentId: createPayment.id,
                    amount: Number(payment?.amount),
                    mobileBanking: payment?.mobileBanking,
                })
                break
            case 'debit_card':
                paymentMethod = await pay_by_debit_card({
                    paymentId: createPayment.id,
                    amount: Number(payment?.amount),
                    debitCard: payment?.debitCard,
                })
                break
            case 'bank':
                paymentMethod = await pay_by_bank({
                    paymentId: createPayment.id,
                    amount: Number(payment?.amount),
                    bank: payment?.bank,
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
            payment = await all_user_payments({ userId })
        } else {
            //find all the payment
            payment = await all_payment()
        }
        if (!payment || payment.length <= 0) {
            //Response: Payment not found
            return res
                .status(400)
                .json({ status: false, message: 'Payment not found' })
        }

        let response = {
            status: true,
            message: `${payment.length} payment found`,
            data: payment.map((item) => {
                return {
                    transactionId: item.id,
                    username: `${item.order.user.firstName} ${item.order.user.lastName}`,
                    paymentType: item.mobileBanking
                        ? item.mobileBanking.bank_name
                        : item.bank
                        ? 'Bank'
                        : item.debitCard
                        ? 'Debit Card'
                        : item.cashPayment
                        ? 'Cash'
                        : null,
                    amount: item.bank
                        ? item.bank.amount
                        : item.mobileBanking
                        ? item.mobileBanking.amount
                        : item.cashPayment
                        ? item.cashPayment.amount
                        : item.debitCard
                        ? item.debitCard.amount
                        : null,
                    date: dayjs(item.createdAt).format('YYYY-MM-DD'),
                    status: item.bank
                        ? item.bank.paymentStatus.name
                        : item.mobileBanking
                        ? item.mobileBanking.paymentStatus.name
                        : item.cashPayment
                        ? item.cashPayment.paymentStatus.name
                        : item.debitCard
                        ? item.debitCard.paymentStatus.name
                        : null,
                }
            }),
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

//get specific payment details by id
const get_payment_details = async (req: Request, res: Response) => {
    const { transactionId } = req.params

    try {
        if (!transactionId) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: 'Missing required fields' })
        }

        //find the payment by id
        const payment = await find_payment_by_id({ id: Number(transactionId) })
        if (!payment) {
            //Response: Payment not found
            return res
                .status(400)
                .json({ status: false, message: 'Payment not found' })
        }

        let response = {
            status: true,
            message: 'Payment found successfully',
            data: {
                paymentType: payment.mobileBanking
                    ? 'mobile_banking'
                    : payment.cashPayment
                    ? 'cash'
                    : payment.debitCard
                    ? 'debit_card'
                    : payment.bank
                    ? 'bank'
                    : null,
                transactionDetails:
                    payment.mobileBanking ||
                    payment.cashPayment ||
                    payment.debitCard ||
                    payment.bank,
            },
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

//update payment status
const update_payment_status_by_id = async (req: Request, res: Response) => {
    const { transactionId } = req.params
    const { paymentStatusId } = req.body

    try {
        if (!transactionId || !paymentStatusId) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: 'Missing required fields' })
        }

        //find the payment by id
        const payment = await find_payment_by_id({ id: Number(transactionId) })

        if (!payment) {
            //Response: Payment not found
            return res
                .status(400)
                .json({ status: false, message: 'Payment not found' })
        }

        //update payment status
        //FIX THIS ERROR LATER
        //Error : Payemnt could not have all the payment method to update the status
        // @ts-ignore

        const updatedPayment = await update_payment_status({
            paymentId: Number(transactionId),
            paymentStatusId: Number(paymentStatusId),
        })

        if (!updatedPayment) {
            //Response: Payment not found
            return res
                .status(400)
                .json({ status: false, message: 'Payment not found' })
        }

        let response = {
            status: true,
            message: 'Payment status updated successfully',
            data: updatedPayment,
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

export {
    create_a_payment,
    find_all_order_payments,
    find_all_payments,
    get_payment_details,
    update_payment_status_by_id,
}
