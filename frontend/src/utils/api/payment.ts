import { AxiosError } from 'axios'
import { PaymentList, PaymentsForOrderResponse } from 'types/payment'
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

export async function all_payments() {
    try {
        const res = await axios.get(`/payment`)
        return res.data as PaymentList
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}

export async function get_payment_details({
    transactionId,
}: {
    transactionId: number
}) {
    try {
        const res = await axios.get(`/payment/transaction/${transactionId}`)
        return res.data
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}
