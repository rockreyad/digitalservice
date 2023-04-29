import { Request, Response } from 'express'
import { getOrdersByDateRange } from '../services/reports'
import { OrderFilterParams } from '../types/report'
import dayjs from 'dayjs'

function getErrorStatus(error: any) {
    return error.status || 500
}

//find order with date range
const getOrdersByDateRangeController = async (req: Request, res: Response) => {
    const { startDate, endDate, statusId, payment } =
        req.query as unknown as OrderFilterParams

    if (!startDate || !endDate) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }
    try {
        const modifiedStartDate = new Date(`${startDate}T00:00:00.000Z`)
        const modifiedEndDate = new Date(`${endDate}T23:59:59.999Z`)
        const modifiedStatusId = Number(statusId)

        const orders = await getOrdersByDateRange({
            startDate: modifiedStartDate,
            endDate: modifiedEndDate,
            statusId: modifiedStatusId,
            payment,
        })

        let response = {
            status: true,
            message: 'Order found successfully',
            data: orders.map((order: any) => {
                return {
                    orderId: order.id,
                    user: order.user,
                    invoiceId: order.invoiceId,
                    statusId: order.statusId,
                    statusType: order.status.name,
                    price: order.price,
                    payment: order.payment.length,
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

export { getOrdersByDateRangeController }
