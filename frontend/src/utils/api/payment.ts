import { AxiosError } from 'axios'
import { PaymentsForOrderResponse } from 'types/payment'
import axios from '../../utils/axiosUtils'

export async function payForOrder({
    orderId,
    payment,
}: {
    orderId: number
    payment: {}
}) {
    try {
        const res = await axios.post(`/payment`, {
            orderId,
            payment,
        })
        return res.data
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}

export async function totalPayment({ orderId }: { orderId: number }) {
    try {
        const res = await axios.get(`/payment/${orderId}`)
        return res.data as PaymentsForOrderResponse
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}
