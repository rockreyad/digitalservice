import { OrderResponse } from './../../../types/order'
import axios from '../../utils/axiosUtils'
import { AxiosError } from 'axios'

export async function getOrdersByDateRange({
    dateFrom,
    dateTo,
    status,
    isChecked,
}: {
    dateFrom: string
    dateTo: string
    status: number
    isChecked: string
}): Promise<OrderResponse> {
    try {
        let res
        if (Number(status) !== 0) {
            res = await axios.get(
                `/reports?startDate=${dateFrom}&endDate=${dateTo}&statusId=${status}&payment=${isChecked}`,
            )
        } else {
            res = await axios.get(
                `/reports?startDate=${dateFrom}&endDate=${dateTo}&payment=${isChecked}`,
            )
        }

        return res.data as OrderResponse
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}
