import axios from '../../utils/axiosUtils'
import { OrderResponse } from 'types/order'
import { AxiosError } from 'axios'

export async function getOrders() {
    const res = await axios.get(`/order`)
    return res.data as OrderResponse
}

export interface OrderError {
    message: string
}

export async function createOrder({
    userId,
    statusId,
    price,
    orderItems,
}: {
    userId: string
    statusId: number
    price: number
    orderItems: { serviceId: number }[]
}): Promise<OrderResponse | OrderError> {
    try {
        const res = await axios.post(`/order`, {
            userId,
            statusId,
            price,
            orderItems,
        })
        return res.data as OrderResponse
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}
