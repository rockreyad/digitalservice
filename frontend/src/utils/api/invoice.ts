import { InvoiceResponse } from 'types/invoice'
import axios from '../../utils/axiosUtils'
import { AxiosError } from 'axios'

export async function getInvoice({ queryKey }: any): Promise<InvoiceResponse> {
    // eslint-disable-next-line no-unused-vars
    const [_, orderId] = queryKey

    try {
        const res = await axios.get(`/invoice/${orderId}`)
        return res.data as InvoiceResponse
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}
