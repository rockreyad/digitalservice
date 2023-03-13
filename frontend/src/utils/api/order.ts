import axios from '../../utils/axiosUtils'
import { OrderError, OrderResponse, OrderViewResponse } from 'types/order'
import { AxiosError } from 'axios'

export async function getOrders() {
    const res = await axios.get(`/order`)
    return res.data as OrderResponse
}

export async function getOrderById({
    queryKey,
}: any): Promise<OrderViewResponse> {
    const [orderId] = queryKey
    try {
        const res = await axios.get(`/order/${orderId}`)
        return res.data as OrderViewResponse
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
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
