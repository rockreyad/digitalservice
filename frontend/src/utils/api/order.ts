import axios from '../../utils/axiosUtils'
import {
    OrderError,
    OrderResponse,
    OrderStatusResponse,
    OrderViewResponse,
} from 'types/order'
import { AxiosError } from 'axios'

export async function getOrders() {
    const res = await axios.get(`/order`)
    return res.data as OrderResponse
}

export async function getOrderById({
    queryKey,
}: any): Promise<OrderViewResponse> {
    // eslint-disable-next-line no-unused-vars
    const [_, orderId] = queryKey

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
    orderItems: { serviceId: number; itemPrice: number }[]
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

//Order Status

export async function getOrderStatus(): Promise<OrderStatusResponse> {
    try {
        const res = await axios.get(`/order-status`)
        return res.data as OrderStatusResponse
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}

export async function updateOrder({
    orderId,
    orderStatusId,
}: {
    orderId: number
    orderStatusId?: number
}): Promise<OrderResponse | OrderError> {
    try {
        const res = await axios.patch(`/order/${orderId}`, {
            orderStatusId,
        })
        return res.data
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}
